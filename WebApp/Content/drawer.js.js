
let lineDensity = 0.8;
let dotDensity = 0.8;
let stickDotDensity = 0.8;

async function drawPot(_potData) {

    let startX = _potData.x;
    let startY = _potData.y;

    let edgePoints = _potData.edgePoints;

    // pick the curves first
    let edgeCurves = [];
    let isOutCurve = random() < 0.5;

    for (let i = 0; i < edgePoints.length - 1; i++) {
        if (isOutCurve)
            edgeCurves.push(curvesOut[int(random(curvesOut.length))]);
        else
            edgeCurves.push(curvesIn[int(random(curvesIn.length))]);

        isOutCurve = !isOutCurve;
    }

    // draw pot body
    for (let i = 0; i < edgePoints.length - 1; i++) {
        let nowPoint = edgePoints[i];
        let nextPoint = edgePoints[(i + 1)];

        let fromX = _potData.x;
        let fromY = _potData.y - nowPoint.y;
        let fromDist = nowPoint.x;

        let toX = _potData.x;
        let toY = _potData.y - nextPoint.y;
        let toDist = nextPoint.x;

        let currentCurve = edgeCurves[i];
        await drawEdgeSegment(fromX, fromY, fromDist, toX, toY, toDist, currentCurve);
    }

    // draw edge dots
    for (let i = 0; i < edgePoints.length - 1; i++) {
        let nowPoint = edgePoints[i];
        let nextPoint = edgePoints[(i + 1)];

        let fromX = _potData.x;
        let fromY = _potData.y - nowPoint.y;
        let fromDist = nowPoint.x;

        let toX = _potData.x;
        let toY = _potData.y - nextPoint.y;
        let toDist = nextPoint.x;

        let currentCurve = edgeCurves[i];
        await drawSegmentDots(fromX, fromY, fromDist, toX, toY, toDist, currentCurve);
    }

    // draw stick
    let baseAngleT = random(0.6, 0.8);
    let endAngleT = random(0.2, 0.4);

    if (random() < 0.5) {
        baseAngleT = random(0.2, 0.4);
        endAngleT = random(0.6, 0.8);
    }

    let baseRadius = edgePoints[0].x;
    let endRadius = edgePoints[edgePoints.length - 1].x;
    let endYOffset = edgePoints[edgePoints.length - 1].y;

    let baseX = startX + baseRadius * sin(radians(lerp(90, 270, baseAngleT)));
    let baseY = startY + baseRadius * 0.24 * -cos(radians(lerp(90, 270, baseAngleT)));

    let endX = startX + endRadius * sin(radians(lerp(90, 270, endAngleT)));
    let endY = startY - endYOffset + endRadius * 0.24 * -cos(radians(lerp(90, 270, endAngleT)));

    // _midLayer.stroke(0, 0, 6);
    // _midLayer.strokeWeight(3);
    // _midLayer.line(baseX, baseY, endX, endY);

    if (random() < 0.6) {
        let stickAngle = getAngle(baseX, baseY, endX, endY);
        let stickX = lerp(baseX, endX, 0.9);
        let stickY = lerp(baseY, endY, 0.9);
        let stickLength = random(1.6, 3.0) * endYOffset;

        let newStickObj = new StickObj(stickX, stickY, stickAngle, stickLength);
        await drawStick(newStickObj);
    }
}

async function drawEdgeSegment(_fromX, _fromY, _fromDist, _toX, _toY, _toDist, _curveFunc) {
    let lineCount = lineDensity * dist(_fromX, _fromY, _toX, _toY);

    for (let i = 0; i < lineCount; i++) {
        let t = i / lineCount; // not drawing the last line
        let curveT = _curveFunc(t);

        let centerX = lerp(_fromX, _toX, t);
        let centerY = lerp(_fromY, _toY, t);

        let nowDist = lerp(_fromDist, _toDist, curveT);

        let leftX = centerX - nowDist;
        let leftY = centerY;

        let rightX = centerX + nowDist;
        let rightY = centerY;

        let nowColor = new NYColor(0, 0, 0);

        // nowColor = NYLerpColor(_colorSet.potStrokeColorA, _colorSet.potStrokeColorB, t);
        nowColor = _colorSet.potStrokeColorA;
        drawCurveLine(leftX, leftY, rightX, rightY, abs(leftX - rightX) * 0.24, nowColor, 12);

        // nowColor = NYLerpColor(_colorSet.potInsideColorA, _colorSet.potInsideColorB, t);
        nowColor = _colorSet.potInsideColorA;
        drawCurveLine(leftX, leftY, rightX, rightY, abs(leftX - rightX) * 0.24, nowColor, 3);
        UpdateLayers();
        // await sleep(1);
    }
}

function drawCurveLine(_x1, _y1, _x2, _y2, _curveHeight, _dotColor, _thickness) {
    let centerX = (_x1 + _x2) / 2;
    let centerY = (_y1 + _y2) / 2;

    let r1 = abs(_x2 - _x1) / 2;
    let r2 = _curveHeight;
    let ellipseRadius = 2 * PI * sqrt((r1 * r1 + r2 * r2) / 2);

    let dotCount = int(ellipseRadius * dotDensity);

    let fromAngle = 0;
    let toAngle = 360;

    let targetLayer = _backLayer;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let nowAngle = lerp(fromAngle, toAngle, t);
        let briAddRatio = sin(radians(lerp(0, 180, t)));
        let strokeWidthRatio = abs(sin(radians(nowAngle + random(-60, 60))));

        let x = centerX + r1 * sin(radians(nowAngle));
        let y = centerY + r2 * -cos(radians(nowAngle));

        let dotSize = noise(centerX, centerY, nowAngle * 0.1) * _thickness + 2;

        if (nowAngle > 90 && nowAngle < 270)
            targetLayer = _frontLayer;
        else
            targetLayer = _backLayer;

        targetLayer.noStroke();
        // stroke(100, 20, 60);
        // strokeWeight(1 * strokeWidthRatio);
        targetLayer.fill(_dotColor.h, _dotColor.s, _dotColor.b + briAddRatio * 20);
        targetLayer.circle(x, y, dotSize);
    }
}

async function drawSegmentDots(_fromX, _fromY, _fromDist, _toX, _toY, _toDist, _curveFunc) {
    let lineCount = lineDensity * dist(_fromX, _fromY, _toX, _toY);

    for (let i = 0; i < lineCount; i++) {
        let t = i / lineCount; // not drawing the last line
        let curveT = _curveFunc(t);

        let centerX = lerp(_fromX, _toX, t);
        let centerY = lerp(_fromY, _toY, t);

        let nowDist = lerp(_fromDist, _toDist, curveT);

        let leftX = centerX - nowDist;
        let leftY = centerY;

        let rightX = centerX + nowDist;
        let rightY = centerY;

        let nowColor = new NYColor(100, 60, 40);

        nowColor = _colorSet.potEdgeDotColor;
        drawCurveLineDots(leftX, leftY, rightX, rightY, abs(leftX - rightX) * 0.24, nowColor, 1);
        UpdateLayers();
        // await sleep(1);
    }
}

function drawCurveLineDots(_x1, _y1, _x2, _y2, _curveHeight, _dotColor, _thickness) {
    let centerX = (_x1 + _x2) / 2;
    let centerY = (_y1 + _y2) / 2;

    let r1 = abs(_x2 - _x1) / 2;
    let r2 = _curveHeight;
    let ellipseRadius = 2 * PI * sqrt((r1 * r1 + r2 * r2) / 2);

    let dotCount = 100;

    let fromAngle = 90;
    let toAngle = 270;

    let targetLayer = _frontLayer;

    for (let i = 0; i < dotCount; i++) {
        let t = 1 - random(random(random()));

        let nowAngle = lerp(fromAngle, toAngle, t);

        let x = centerX + r1 * sin(radians(nowAngle));
        let y = centerY + r2 * -cos(radians(nowAngle));

        let dotSize = noise(centerX, centerY, nowAngle * 0.1) * _thickness + 1;

        targetLayer.noStroke();
        // stroke(100, 20, 60);
        // strokeWeight(1 * strokeWidthRatio);
        targetLayer.fill(_dotColor.h, _dotColor.s, _dotColor.b);
        targetLayer.circle(x, y, dotSize);
    }
}

function drawStick(_x, _y, _startDir, _thickness, _length) {
    let lineCount = lineDensity * _length;;
    let stepDistance = 1.0 / (lineDensity);

    let nowX = _x;
    let nowY = _y;
    let nowAngle = _startDir;
    let baseAngle = _startDir;

    let noiseZ = random(-1000000, 1000000);

    for (let i = 0; i < lineCount; i++) {
        circle(nowX, nowY, 12);

        strokeWeight(1);
        stroke(0, 0, 10);
        fill(0, 0, random(30, 60));

        nowAngle = _startDir + noise(nowX * 0.06, nowY * 0.06, noiseZ) * 60 - 30;
        nowX += sin(radians(nowAngle)) * stepDistance;
        nowY -= cos(radians(nowAngle)) * stepDistance;

    }

}


async function drawStick(_stickObj) {

    let hasFlower = random() < 0.5;

    for (let i = 0; i < _stickObj.nodes.length; i++) {
        let nodeData = _stickObj.nodes[i];
        // _midLayer.strokeWeight(3);
        // _midLayer.stroke(0, 0, 20);
        // _midLayer.line(nodeData.x1, nodeData.y1, nodeData.x2, nodeData.y2);
        _midLayer.noStroke();
        _midLayer.fill(_colorSet.stickColor.h, _colorSet.stickColor.s, _colorSet.stickColor.b);

        let nowThickness = 3;

        if (nodeData.nodeDepth <= 2) {
            nowThickness = 2;
        }
        drawStickBranch(nodeData.x1, nodeData.y1, nodeData.x2, nodeData.y2, nowThickness);

        if (nodeData.nodeDepth <= 3 && hasFlower)
            drawDottedFlowers(nodeData);

        UpdateLayers();
        // await sleep(1);
    }
}

function drawStickBranch(_x1, _y1, _x2, _y2, _thickness) {
    let dotCount = dist(_x1, _y1, _x2, _y2) * stickDotDensity;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let nowX = lerp(_x1, _x2, t);
        let nowY = lerp(_y1, _y2, t);

        let normalAngle = getAngle(_x1, _y1, _x2, _y2) + 90;

        nowX += sin(radians(normalAngle)) * noise(nowX * 0.1, nowY * 0.1, 666.0) * _thickness;
        nowY -= cos(radians(normalAngle)) * noise(nowX * 0.1, nowY * 0.1, 999.0) * _thickness;

        let dotSize = noise(nowX * 0.6, nowY * 0.6) * _thickness + _thickness * 0.5;
        _midLayer.circle(nowX, nowY, dotSize);
    }
}

function drawDottedFlowers(_node) {
    let flowerDotCount = int(random(0, 6));

    for (let i = 0; i < flowerDotCount; i++) {
        let xPos = lerp(_node.x1, _node.x2, random());
        let yPos = lerp(_node.y1, _node.y2, random());

        xPos += random() * 60 - 30;
        yPos += random() * 60 - 30;

        let dotSize = random(0.1, 6);

        _midLayer.noStroke();
        _midLayer.fill(_colorSet.flowerColor.h, _colorSet.flowerColor.s, _colorSet.flowerColor.b);
        _midLayer.circle(xPos, yPos, dotSize);
    }
}