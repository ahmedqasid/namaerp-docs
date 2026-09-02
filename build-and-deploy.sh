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
# The support knowledge base (github.com/ahmedqasid/namaerp-support-kb) bundles this repo and
# namaerp-dm as git submodules so support staff can run Claude Code over both. A submodule pins
# one commit and never follows master on its own -- somebody has to move the pointer, and until
# they do, support answers questions from whatever the docs looked like on the day the pin was
# last touched. Moving it from the deploy ties the pin to the only moment we know a commit is
# not merely pushed but built and serving.
#
#   SUPPORT_KB_DIR=/root/namaerp-support-kb   # where the KB is cloned on this host
#   SUPPORT_KB_LOCK_WAIT=300                  # seconds to queue behind the other deploy
#
# The clone does NOT need the submodule contents -- 250MB of docs this host will never read --
# so the pointer is written straight into the index with update-index. A plain
# `git clone <kb>` (no --recurse-submodules) is the intended setup; a clone that does have the
# submodule checked out is kept in step too, so `git status` there stays clean.
#
# The pin moves to the commit that was just DEPLOYED, not to origin/master: someone may have
# pushed while npm was building, and the KB has to describe the site that is actually serving.
# git_pull left HEAD at origin/master, so this commit is on the remote and the KB can reach it.
#
# namaerp-docs and namaerp-dm deploy from the same server into the SAME KB clone, so their two
# updates must not interleave -- the other one's `reset --hard` landing between our update-index
# and our commit wipes the staged pin. Two defences, because a pin lost in silence is worse than
# any loud deploy failure: a lock so it does not happen (the path is shared with namaerp-dm's
# copy of these functions -- keep them identical), and every check made against HEAD and the
# remote rather than the index, so a lost update is retried instead of reported as success.
function acquireSupportKbLock() {
    SUPPORT_KB_LOCK_HELD=0
    local lock_file="${SUPPORT_KB_LOCK_FILE:-/var/lock/namaerp-support-kb.lock}"

    if ! command -v flock >/dev/null 2>&1 ; then
      echo "WARNING: flock not found - support KB update runs unserialised." >&2
      return 0
    fi
    # fd 8, not 9: the docs deploy holds its own lock on 9 for the life of the process.
    exec 8<>"$lock_file" || {
      echo "WARNING: cannot open $lock_file - support KB update runs unserialised." >&2
      return 0
    }
    if ! flock -w "${SUPPORT_KB_LOCK_WAIT:-300}" 8 ; then
      echo "WARNING: the other deploy has held $lock_file for ${SUPPORT_KB_LOCK_WAIT:-300}s -" >&2
      echo "         skipping the pin update rather than racing it; the next deploy carries it." >&2
      exec 8>&-
      return 1
    fi
    SUPPORT_KB_LOCK_HELD=1
    return 0
}
function releaseSupportKbLock() {
    [[ "${SUPPORT_KB_LOCK_HELD:-0}" == 1 ]] && exec 8>&-
    SUPPORT_KB_LOCK_HELD=0
    return 0
}
function updateSupportKbPointer() {
    local kb_dir="$1" sub="$2" sha="$3"

    # Re-read the remote every attempt: the retry exists precisely because someone else -- the
    # other deploy, or a teammate -- pushed between our fetch and our push, so the next attempt
    # must build on their commit rather than clobber it.
    git -C "$kb_dir" fetch -q origin master || return 1
    git -C "$kb_dir" reset -q --hard        || return 1
    git -C "$kb_dir" checkout -q -B master FETCH_HEAD || return 1

    # Compared against HEAD, never against the index. The index belongs to the clone, not to
    # this run: the other deploy's `reset --hard` can empty it under us, and "the index matches
    # HEAD" would then read as "already pinned" -- reporting success having advanced nothing.
    if [[ "$(git -C "$kb_dir" rev-parse "HEAD:$sub" 2>/dev/null)" == "$sha" ]] ; then
      echo "Support KB already pins $sub at $sha - nothing to push."
      return 0
    fi

    git -C "$kb_dir" update-index --cacheinfo "160000,$sha,$sub" || return 1
    if [[ -e "$kb_dir/$sub/.git" ]] ; then
      git -C "$kb_dir/$sub" fetch -q origin master && git -C "$kb_dir/$sub" checkout -q "$sha"
    fi
    # An explicit identity: this may be the first commit ever made on this host, and a deploy
    # that died on "Please tell me who you are" would be a silly way to lose a release. A commit
    # that finds nothing staged means the pin was reset away in the line above -- so let it fail
    # into the retry rather than treating an empty commit as done.
    git -C "$kb_dir" -c user.name='Nama deploy' -c user.email='deploy@namasoft.com' \
        commit -q -m "Advance $sub to ${sha:0:12}" || return 1
    git -C "$kb_dir" push -q origin master || return 1

    # Read the pin back off the remote instead of trusting the push. Last line of defence: if
    # anything above dropped it, this turns a silent no-op into a retry.
    git -C "$kb_dir" fetch -q origin master || return 1
    if [[ "$(git -C "$kb_dir" rev-parse "FETCH_HEAD:$sub" 2>/dev/null)" != "$sha" ]] ; then
      echo "Support KB push did not land $sub at $sha." >&2
      return 1
    fi
    echo "Support KB now pins $sub at $sha."
}
# Never fatal. The site is already published by the time this runs; a stale pin is a nuisance,
# not an outage, and failing here would only misreport a good deploy as a bad one. It is loud
# instead, because nothing else watches this.
function advanceSupportKb() {
    local kb_dir="${SUPPORT_KB_DIR:-/root/namaerp-support-kb}"
    local sub="namaerp-docs"
    local sha attempt

    sha=$(git rev-parse HEAD)
    if [[ $? != 0 || -z "$sha" ]] ; then
      echo "WARNING: cannot resolve HEAD - support KB pin not advanced." >&2
      return 0
    fi
    if [[ ! -d "$kb_dir/.git" ]] ; then
      echo "WARNING: no support KB clone at $kb_dir - pin not advanced." >&2
      echo "         git clone https://github.com/ahmedqasid/namaerp-support-kb.git $kb_dir" >&2
      return 0
    fi
    acquireSupportKbLock || return 0

    for attempt in 1 2 3 ; do
      if updateSupportKbPointer "$kb_dir" "$sub" "$sha" ; then
        releaseSupportKbLock
        return 0
      fi
      echo "Support KB update attempt $attempt failed - refetching and retrying." >&2
    done
    releaseSupportKbLock
    echo "ERROR: could not pin $sub at $sha in the support KB after 3 attempts." >&2
    echo "       The site IS deployed - only the KB pin is stale. To fix by hand:" >&2
    echo "       cd $kb_dir && git submodule update --remote --merge && git commit -am 'Update submodule pointers' && git push" >&2
    return 0
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
advanceSupportKb
