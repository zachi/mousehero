************ Command line commands**************

connect to AWS server: ssh -i "/Users/zachi/Documents/ssh/mousehero.pem" ec2-user@ec2-13-58-126-38.us-east-2.compute.amazonaws.com

find proces using port 80: sudo netstat -lpn |grep :80

start website and avoid terminal closed: sudo nohup node ./bin/www null &

discard lo acl git changes: git reset --hard origin/master

run website with debug messages: sudo DEBUG=mousehero:server npm start

generate manifest.appcache file: node -e 'require("./server/controllers/manifest-appcache").generateFile()';

generate music list json file: node -e 'require("./controllers/music").generateFile()'

open chrome without certificate error 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors
