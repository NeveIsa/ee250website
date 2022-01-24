#wetty ---allow-iframe --base "" --port 2501 --title EE250-PI-PLAYGROUND  --ssh-host 192.168.250.250 --ssh-port 22 --ssl-cert fullchain.pem --ssl-key privkey.pem  --ssh-user pi
#wetty ---allow-iframe --base "" --port 2501 --title EE250-PI-PLAYGROUND  --ssh-host 192.168.250.250 --ssh-port 22   --ssh-user pi

wetty --base "" --port 2505 -c docker run -it --rm ubuntu bash
