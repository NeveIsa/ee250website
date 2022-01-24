./ttyd.x86_64 -R --ssl --ssl-cert ../wettyssl/fullchain.pem --ssl-key ../wettyssl/privkey.pem --port 2503 docker run --net=host -v $PWD:/root:ro -it --rm sbmohant/ee250  bash /root/RUN_TCP_SERVER.sh
