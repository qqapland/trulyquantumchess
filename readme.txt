quantum chess game

works again go to trulyquantumchess.adi.fr.eu.org

features:
- themes that change by refreshing the page
- suggested moves
- an undo button
- hovering to show exact probabilities

to run:
docker build -t chess -f Dockerfile . && docker run --init -p 9000:9000 chess mono WebApp.exe  
(use --init to passthrough the ^C for debugging)

background, zen Pots by newyellow
original code by caphindsight