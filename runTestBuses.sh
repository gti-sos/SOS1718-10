#!/bin/bash

case $1 in
    heroku)
    npm test -- -- params.host=sos1718-10.herokuapp.com/#!/buses -- params.port=80
    ;;
    *)
    npm test
    ;;
esac