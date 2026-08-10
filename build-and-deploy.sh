set -x
# Only one deploy at a time. Every stage of this script is hostile to a concurrent copy of
# itself: git_pull runs `git reset --hard` over the working tree, the rsync runs with
# --delete, and the Meilisearch push swaps a whole index out from under whatever is
# reading it. Two overlapping runs do not merely race -- they can publish a tree that is
# half of one commit and half of another.
#
# flock ties the lock to this process's lifetime, so a crash, a timeout or a kill -9
# releases it automatically. A PID file would not: it would strand a stale lock and need
# manual clearing at the worst possible moment.
#
#   DEPLOY_LOCK_WAIT=300 ./build-and-deploy.sh   # queue behind a running deploy instead
#                                                # of aborting (seconds; 0 = fail fast)
function acquireDeployLock() {
    local lock_file="${DEPLOY_LOCK_FILE:-/var/lock/namaerp-docs-deploy.lock}"
    local wait_secs="${DEPLOY_LOCK_WAIT:-0}"

    if ! command -v flock >/dev/null 2>&1 ; then
      echo "ERROR: flock not found, so concurrent deploys cannot be prevented." >&2
      echo "       Install it (apt-get install -y util-linux) and re-run." >&2
      exit 1
    fi

    if ! [[ "$wait_secs" =~ ^[0-9]+$ ]] ; then
      echo "ERROR: DEPLOY_LOCK_WAIT must be a whole number of seconds, got '$wait_secs'" >&2
      exit 1
    fi

    # fd 9 stays open for the life of the script; the lock dies with the process.
    # `<>` not `>`: plain `>` truncates on open, which would erase the running deploy's
    # PID line before we ever get to print it in the failure message below.
    exec 9<>"$lock_file" || { echo "ERROR: cannot open lock file $lock_file" >&2; exit 1; }

    local rc=0
    if [[ "$wait_secs" -gt 0 ]] ; then
      flock -w "$wait_secs" 9 || rc=$?
    else
      flock -n 9 || rc=$?
    fi
    if [[ $rc != 0 ]] ; then
      echo "ERROR: another build-and-deploy.sh is already running." >&2
      echo "       Lock: $lock_file -- holder: $(cat "$lock_file" 2>/dev/null || echo unknown)" >&2
      echo "       Set DEPLOY_LOCK_WAIT=<seconds> to queue behind it instead of aborting." >&2
      exit 1
    fi

    # Diagnostic only -- flock is the actual gate. Safe to truncate now that we hold it.
    printf 'pid=%s host=%s started=%s\n' "$$" "$(hostname)" "$(date -Is)" > "$lock_file"
}
acquireDeployLock
function git_pull() {
    git reset --hard
    git checkout -B master origin/master
    git checkout -f master
    git pull  origin master
    #git gc
}
function checkForErrors() {
    rc=$?
    if [[ $rc != 0 ]] ; then
      echo 'There are build errors';
      exit 1
    fi
}
# The vitepress build peaks near 5GB of JS heap on the current ~1300 page site, while node sizes
# its default heap limit from RAM -- once the default falls below the peak the build dies with
# "FATAL ERROR: Ineffective mark-compacts near heap limit".
function raiseNodeHeapLimit() {
    export NODE_OPTIONS="--max-old-space-size=8192"
    total_mb=$(awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo)
    if [[ $total_mb -lt 9216 ]] ; then
      echo "WARNING: only ${total_mb}MB RAM for a 8192MB heap - the kernel OOM killer may hit the build"
    fi
}
# Secrets for the search stack live OUTSIDE this repo (it is public) in
# /etc/docs-search.env, which must define:
#   MEILI_MASTER_KEY  -- same value as docker/.env
#   DOCS_SEARCH_TOKEN -- same value as NLM's docs.search.admin.token property
# This script runs under `set -x` and its output is redirected into a mail, so every
# expanded command is readable by whoever gets that mail. Secrets must never pass through
# the trace: sourcing the env file traces its assignments, a [[ -z "$SECRET" ]] test traces
# the value, and a --header=... argument traces it verbatim. Wrap all three.
function hideSecrets() {
    XTRACE_WAS_ON=0
    case "$-" in *x*) XTRACE_WAS_ON=1 ;; esac
    set +x
}
function restoreTrace() {
    [[ "${XTRACE_WAS_ON:-0}" == 1 ]] && set -x
    return 0   # never let the test above become this function's exit status
}
function loadSearchEnv() {
    hideSecrets
    local env_file="${MEILI_ENV_FILE:-/etc/docs-search.env}"
    if [[ -f "$env_file" ]] ; then
      set -a; . "$env_file"; set +a
      echo "Loaded search secrets from $env_file"
    else
      echo "WARNING: $env_file not found - search push and cache eviction will be skipped."
    fi
    restoreTrace
}
# Ships the freshly built index into Meilisearch, which backs site search through NLM's
# /nlm/docs-search servlet.
#
# Skipped with a warning when no key is present, so a server that has not been set up
# yet still deploys the site; a real push failure is fatal, because silently serving a
# stale index is worse than a loud deploy failure.
function pushSearchIndex() {
    hideSecrets
    if [[ -z "${MEILI_MASTER_KEY:-}" ]] ; then
      restoreTrace
      echo "WARNING: MEILI_MASTER_KEY unset - skipping Meilisearch push."
      echo "         Site search will keep serving whatever is already indexed."
      return 0
    fi
    # Safe to trace from here: the key reaches node through the exported environment,
    # never as an argument, so it does not appear in the traced command line.
    restoreTrace
    node scripts/push-search-index.mjs
    checkForErrors
}
# Tells NLM to drop its cached copies of the index and re-embed. This endpoint is NOT a
# read -- it triggers a full OpenAI re-embed -- so it is authenticated with a shared
# secret sent as a header (a query parameter would end up in access logs). NLM fails
# closed: without docs.search.admin.token set on its side, this returns 401.
function evictNlmSearchCache() {
    hideSecrets
    if [[ -z "${DOCS_SEARCH_TOKEN:-}" ]] ; then
      restoreTrace
      echo "WARNING: DOCS_SEARCH_TOKEN unset - skipping NLM cache eviction."
      echo "         NLM will keep serving its previously loaded index until restarted."
      return 0
    fi
    echo "Evicting NLM docs-search cache"
    # Stays untraced: the token is an ARGUMENT here, so tracing this line would print it
    # into the mail. wget itself does not echo request headers.
    wget -O - --header="X-Docs-Search-Token: ${DOCS_SEARCH_TOKEN}" \
      "https://nlm.namasoft.com/nlm/docs-search?evict-cache=true&url=https://docs.namasoft.com"
    local rc=$?
    restoreTrace
    ( exit $rc )    # hand wget's status to checkForErrors, which reads $?
    checkForErrors
}
git_pull
checkForErrors
npm i
raiseNodeHeapLimit
npm run docs:build
checkForErrors
mkdir /var/www/docs
rsync -L -r -t -v -z -q --delete -s  ./docs/.vitepress/dist/  /var/www/docs/
chown -R www-data /var/www/docs/
loadSearchEnv
pushSearchIndex
evictNlmSearchCache
