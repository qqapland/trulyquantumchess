quantum chess game

trulyquantumchess.adi.fr.eu.org

repo probably leaks some random credentials

just some hacks to get it working again, originally by caphindsight

also deleted some things

to run:
docker build -t chess -f Dockerfile . && docker run --init -p 9000:9000 chess mono WebApp.exe  
(use --init to passthrough the ^C for debugging)

background, zen Pots by newyellow