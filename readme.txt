quantum chess game

works again go to trulyquantumchess.adi.fr.eu.org

probably leaks some random credentials

features:
- themes that change by refreshing the page
- suggested moves (disable with ?suggestions=false)
- an undo button
- hovering to show exact probabilities
- right click drag to add arrows

to run:
docker build -t chess -f Dockerfile . && docker run --init -p 9000:9000 chess mono WebApp.exe  
(use --init to passthrough the ^C for debugging)

background, zen Pots by newyellow
original code by caphindsight