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
      ./notify.sh NOTOK $RELEASE_NAME
      touch /var/tmp/namabuilderrors.txt
      exit
    fi
}
git_pull
checkForErrors
npm i
npm run docs:build
checkForErrors
mkdir /var/www/docs
rsync -L -r -t -v -z -q --delete -s  ./docs/.vuepress/dist/  /var/www/docs/
chown -R www-data /var/www/html/docs/

