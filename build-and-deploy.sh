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
# Ships the freshly built index into Meilisearch, which backs site search through NLM's
# /nlm/docs-search servlet. The master key is NOT kept in this repo -- put it in
# /etc/docs-search.env (MEILI_MASTER_KEY=...), the same key as
# code/tools/docs-search/docker/.env.
#
# Skipped with a warning when no key is present, so a server that has not been set up
# yet still deploys the site; a real push failure is fatal, because silently serving a
# stale index is worse than a loud deploy failure.
function pushSearchIndex() {
    local env_file="${MEILI_ENV_FILE:-/etc/docs-search.env}"
    if [[ -f "$env_file" ]] ; then
      set -a; . "$env_file"; set +a
    fi
    if [[ -z "${MEILI_MASTER_KEY:-}" ]] ; then
      echo "WARNING: MEILI_MASTER_KEY unset (looked in $env_file) - skipping Meilisearch push."
      echo "         Site search will keep serving whatever is already indexed."
      return 0
    fi
    node scripts/push-search-index.mjs
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
pushSearchIndex
wget -O - "https://nlm.namasoft.com/nlm/docs-search?evict-cache=true&url=https://docs.namasoft.com"
