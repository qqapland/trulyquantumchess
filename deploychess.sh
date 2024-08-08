dsi() { docker stop $(docker ps -a | awk -v i="^$1.*" '{if($2~i){print$1}}'); }

docker load -i /home/a/chess.tar
dsi chess
docker run -d -p 3000:9000 chess mono WebApp.exe