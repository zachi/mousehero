************ Command line commands**************

connect to AWS server: ssh -i "/Users/zachi/Documents/ssh/mmrt.pem" ec2-user@ec2-18-216-65-204.us-east-2.compute.amazonaws.com

find proces using port 80: sudo netstat -lpn |grep :80

start website and avoid terminal closed: sudo nohup node ./bin/www null &

discard local git changes: git reset --hard origin/master

run website with debug messages: sudo DEBUG=mousehero:server npm start

generate manifest.appcache file: node -e 'require("./server/controllers/manifest-appcache").generateFile()';

generate music list json file: node -e 'require("./controllers/music").generateFile()'

open chrome without certificate error ** works only when no instance of chrome exists
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors

connect to mlab from command line(shell connection to mlab)
mongo ds035683.mlab.com:35683/mousehero -u zachi -p Rain1234 