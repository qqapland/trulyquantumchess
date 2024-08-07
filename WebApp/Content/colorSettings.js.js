let colorSets = [];

function GetColorSet() {
    let blueSet = {
        bgColor: new NYColor(0, 0, 92),
        bgDotColor: new NYColor(200, 20, 80),
        stickColor: new NYColor(0, 0, 20),
        potStrokeColorA: new NYColor(200, 30, 30),
        potInsideColorA: new NYColor(200, 6, 80),
        potEdgeDotColor: new NYColor(200, 6, 80),
        flowerColor: new NYColor(0, 0, 100),
    };
    colorSets.push(blueSet);

    let sakuraSet = {
        bgColor: new NYColor(330, 28, 90),
        bgDotColor: new NYColor(346, 28, 80),
        stickColor: new NYColor(0, 0, 20),
        potStrokeColorA: new NYColor(346, 30, 30),
        potInsideColorA: new NYColor(342, 8, 90),
        potEdgeDotColor: new NYColor(350, 30, 90),
        flowerColor: new NYColor(0, 0, 100),
    };
    colorSets.push(sakuraSet);

    let greenSet = {
        bgColor: new NYColor(0, 0, 90),
        bgDotColor: new NYColor(0, 0, 80),
        stickColor: new NYColor(0, 0, 20),
        potStrokeColorA: new NYColor(174, 42, 40),
        potInsideColorA: new NYColor(95, 40, 100),
        potEdgeDotColor: new NYColor(95, 10, 95),
        flowerColor: new NYColor(40, 100, 100),
    };
    colorSets.push(greenSet);

    let devilSet = {
        bgColor: new NYColor(0, 20, 12),
        bgDotColor: new NYColor(0, 0, 24),
        stickColor: new NYColor(0, 0, 100),
        potStrokeColorA: new NYColor(342, 100, 60),
        potInsideColorA: new NYColor(320, 40, 80),
        potEdgeDotColor: new NYColor(340, 40, 20),
        flowerColor: new NYColor(60, 80, 100),
    };
    colorSets.push(devilSet);

    let zenSet = {
        bgColor: new NYColor(0, 0, 80),
        bgDotColor: new NYColor(0, 0, 90),
        stickColor: new NYColor(0, 0, 40),
        potStrokeColorA: new NYColor(0, 0, 50),
        potInsideColorA: new NYColor(0, 0, 80),
        potEdgeDotColor: new NYColor(0, 0, 60),
        flowerColor: new NYColor(350, 40, 100),
    };
    colorSets.push(zenSet);


    return colorSets[int(random(0, colorSets.length))];
}