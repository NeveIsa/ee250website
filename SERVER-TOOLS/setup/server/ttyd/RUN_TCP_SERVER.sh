
RED='\033[0;31m'
NC='\033[0m' # No Color
BGGREEN='\e[42m'

echo -e "TCP Server is Running at \n -> HOST/IP: ${RED}lab.ee250io.tk${NC} or ${BGGREEN} $(curl -s ifconfig.me) ${NC}"
echo -e " -> PORT: random_port {see below}";
echo "The Server will self terminate in 2 mins."
echo ""

timeout 120 /root/bin_tcp_server
echo "TCP SERVER EXITED. YOU MAY NOW CLOSE THIS BROWSER TAB"
sleep 120
