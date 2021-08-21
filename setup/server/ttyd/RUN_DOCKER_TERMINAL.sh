
RED='\033[0;31m'
NC='\033[0m' # No Color
BGGREEN='\e[42m'

echo -e "This terminal instance will ${RED}self terminate in 5 mins.${NC}"
echo -e "\n${BGGREEN} You will need to enter your Github Credentials to login to this terminal.${NC}\n"
echo ""

git clone https://github.com/usc-ee250-spring2021/rpi-login && pushd rpi-login && git push && clear \
&& echo -e "\n\nYou can use git clone to get your server code and run it here\n" &&\
echo -e " -> HOST/IP: ${RED}lab.ee250io.tk${NC} or ${BGGREEN} $(curl -s ifconfig.me) ${NC}\n -> PORT: Run your server app on random port in the range ${RED}7100-7199${NC}\n" &&\
echo -e "You can then connect your client code to this server using the above ${BGGREEN}HOST${NC} and ${BGGREEN}PORTS${NC}\n\n" &&\
su - ee250

sleep 30
