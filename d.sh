if [[ $PRODORDEV == dev ]]
then
    echo "wwwww"
elif  [[ $BRANCH  ]]
then
   echo "DDDDDD"
else
    pE "errorcodes: $BRANCH $COMMIT_ID"
    exit
    fi
fi
