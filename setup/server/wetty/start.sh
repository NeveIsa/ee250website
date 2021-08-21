
docker pull svenihoney/wetty
RPI="192.168.250.250"
docker run -dt -e REMOTE_SSH_SERVER=$RPI -e REMOTE_SSH_PORT=22 -p 2501:3000 --name wettyterm  svenihoney/wetty 
