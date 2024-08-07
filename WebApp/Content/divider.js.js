
function getStick(_x, _y, _dir, _length, _maxNodeDepth) {
    let fromX = _x;
    let fromY = _y;

    let toX = fromX + _length * sin(radians(_dir));
    let toY = fromY + _length * -cos(radians(_dir));

    let nodes = [];
    nodes.push({
        'x1': fromX,
        'y1': fromY,
        'x2': toX,
        'y2': toY,
        'dir': _dir,
        'length': _length,
        'nodeDepth': _maxNodeDepth
    });

    let splitNode = random() < 0.5;

    if (_maxNodeDepth > 0 && splitNode) {

        let leftMin = 0.6;
        let rightMin = 0.6;

        if(random() < 0.5)
            leftMin = 0.1;
        else
            rightMin = 0.1;

        let leftNodes = getStick(toX, toY, _dir + random(-20, -6), _length * random(leftMin, 0.95), _maxNodeDepth - 1);
        let rightNodes = getStick(toX, toY, _dir + random(6, 20), _length * random(rightMin, 0.95), _maxNodeDepth - 1);

        for(let i=0; i< leftNodes.length; i++) 
            nodes.push(leftNodes[i]);
        
        for(let i=0; i< rightNodes.length; i++)
            nodes.push(rightNodes[i]);
    }
    else if(_maxNodeDepth > 0)
    {
        let newNodes = getStick(toX, toY, _dir + random(-20, 20), _length * random(0.6, 0.95), _maxNodeDepth - 1);

        for(let i=0; i< newNodes.length; i++)
            nodes.push(newNodes[i]);
    }

    return nodes;
}