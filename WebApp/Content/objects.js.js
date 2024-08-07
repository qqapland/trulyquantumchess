class PotData {
    constructor(_x, _y, _potWidth, _potHeight) {
        this.x = _x;
        this.y = _y;
        this.edgePoints = [];
        this.edgePointCount = int(random(3, 12));

        for (let i = 0; i < this.edgePointCount; i++) {
            let pointX = random(0.3, 1.0) * _potWidth;
            let pointY = _potHeight * (i / (this.edgePointCount - 1));

            this.edgePoints.push({ 'x': pointX, 'y': pointY });
        }
    }
}

class StickObj {
    constructor(_x, _y, _startDir, _stickLength) {
        this.x = _x;
        this.y = _y;

        this.nodes = [];
        this.nodeCount = 6;

        let segmentAvgLength = _stickLength / this.nodeCount;
        
        this.nodes = getStick(_x, _y, _startDir, segmentAvgLength, this.nodeCount);
    }
}

class NYColor {
    constructor(_h, _s, _b, _a = 1.0) {
        this.h = _h;
        this.s = _s;
        this.b = _b;
        this.a = _a;
    }

    copy() {
        return new NYColor(this.h, this.s, this.b, this.a);
    }

    slightRandomize(_hDiff = 10, _sDiff = 12, _bDiff = 12, _aDiff = 0.0) {
        this.h += random(-0.5 * _hDiff, 0.5 * _hDiff);
        this.s += random(-0.5 * _sDiff, 0.5 * _sDiff);
        this.b += random(-0.5 * _bDiff, 0.5 * _bDiff);
        this.a += random(-0.5 * _aDiff, 0.5 * _aDiff);

        this.h = processHue(this.h);
    }

    color() {
        return color(this.h, this.s, this.b, this.a);
    }

    static newRandomColor(_mainHue) {
        let h = processHue(_mainHue + random(-80, 80));
        let s = random(40, 100);
        let b = random(60, 100);

        return new NYColor(h, s, b);
    }
}


