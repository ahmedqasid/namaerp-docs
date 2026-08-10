set -x
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
function loadSearchEnv() {
    local env_file="${MEILI_ENV_FILE:-/etc/docs-search.env}"
    if [[ -f "$env_file" ]] ; then
      set -a; . "$env_file"; set +a
    else
      echo "WARNING: $env_file not found - search push and cache eviction will be skipped."
    fi
}
# Ships the freshly built index into Meilisearch, which backs site search through NLM's
# /nlm/docs-search servlet.
#
# Skipped with a warning when no key is present, so a server that has not been set up
# yet still deploys the site; a real push failure is fatal, because silently serving a
# stale index is worse than a loud deploy failure.
function pushSearchIndex() {
    if [[ -z "${MEILI_MASTER_KEY:-}" ]] ; then
      echo "WARNING: MEILI_MASTER_KEY unset - skipping Meilisearch push."
      echo "         Site search will keep serving whatever is already indexed."
      return 0
    fi
    node scripts/push-search-index.mjs
    checkForErrors
}
# Tells NLM to drop its cached copies of the index and re-embed. This endpoint is NOT a
# read -- it triggers a full OpenAI re-embed -- so it is authenticated with a shared
# secret sent as a header (a query parameter would end up in access logs). NLM fails
# closed: without docs.search.admin.token set on its side, this returns 401.
function evictNlmSearchCache() {
    if [[ -z "${DOCS_SEARCH_TOKEN:-}" ]] ; then
      echo "WARNING: DOCS_SEARCH_TOKEN unset - skipping NLM cache eviction."
      echo "         NLM will keep serving its previously loaded index until restarted."
      return 0
    fi
    wget -O - --header="X-Docs-Search-Token: ${DOCS_SEARCH_TOKEN}" \
      "https://nlm.namasoft.com/nlm/docs-search?evict-cache=true&url=https://docs.namasoft.com"
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
