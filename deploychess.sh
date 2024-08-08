dsi() { docker stop $(docker ps -a | awk -v i="^$1.*" '{if($2~i){print$1}}'); }
dsi chess

docker load -i /home/a/chess.tar # this causes rename
docker run -d -p 3000:9000 chess mono WebApp.exe