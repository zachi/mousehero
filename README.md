************ Command line commands**************
ssh -i "/Users/zachi/Documents/ssh/mousehero.pem" ec2-user@ec2-13-58-126-38.us-east-2.compute.amazonaws.com
sudo netstat -lpn |grep :80
sudo nohup node ./bin/www null &
git reset --hard origin/master
sudo DEBUG=mousehero:server npm start
node -e 'require("./server/controllers/manifest-appcache").generateFile()';
node -e 'require("./controllers/music").generateFile()'

