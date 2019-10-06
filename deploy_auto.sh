#!/usr/bin/ bash
BRANCH=${BRANCH}
COMMIT_ID=${COMMITID}
PRODORDEV=${PRODORDEV}

pV(){
    echo -e "\033[;36m$1\033[0m"
}
pI(){
    echo "\033[;32m$1\033[0m"
}
pD(){
    echo "\033[;34m$1\033[0m"
}
pW(){
    echo -e "\a\033[;33m$1\033[0m"
}
pE(){
    echo -e "\033[;31m$1\033[0m"
}
if  [[ $BRANCH && $COMMIT_ID && $PRODORDEV ]];then 
    pI "rightcodes: $BRANCH $COMMIT_ID"
    git reset head --hard
    git checkout $BRANCH
    git pull
    git reset $COMMIT_ID --hard
    npm install
    npm run $PRODORDEV
else
    pE "errorcodes: $BRANCH $COMMIT_ID"
    exit
fi

echo 123
