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
git_pull
checkForErrors
npm i
raiseNodeHeapLimit
npm run docs:build
checkForErrors
mkdir /var/www/docs
rsync -L -r -t -v -z -q --delete -s  ./docs/.vitepress/dist/  /var/www/docs/
chown -R www-data /var/www/docs/
wget -O - "https://nlm.namasoft.com/nlm/docs-search?evict-cache=true&url=https://docs.namasoft.com"
