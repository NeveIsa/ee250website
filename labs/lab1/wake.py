import time,sys

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


print(bcolors.OKGREEN)


time.sleep(1)

sys.stdout.write('WAKE UP,')
sys.stdout.flush()
time.sleep(1)

sys.stdout.write(' NEO...\n')
sys.stdout.flush()

time.sleep(3)
sys.stdout.write('THE MATRIX HAS YOU')
sys.stdout.flush()
time.sleep(1)

sys.stdout.write('...\n')
sys.stdout.flush()
time.sleep(2)


sys.stdout.write('FOLLOW THE WHITE RABBIT.\n\n\n')
sys.stdout.flush()
time.sleep(5)

sys.stdout.write('KNOCK, ')
sys.stdout.flush()
time.sleep(1)

sys.stdout.write('KNOCK, ')
sys.stdout.flush()
time.sleep(2)

print(' NEO.')
time.sleep(2)

