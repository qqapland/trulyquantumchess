//
// Weekly Creative Coding Challenge Topic 'Pottery'
//

// Check the challenge page if you would like to join:
// https://openprocessing.org/curation/78544 


let _backLayer;
let _midLayer;
let _frontLayer;

let _colorSet;

async function setup() {
  createCanvas(windowWidth, windowHeight);
	describe('This work randomly assembles different easing curves to create a pot shape and then uses stroke dots for an overall aesthetic style.');
	
  _backLayer = createGraphics(width, height);
  _midLayer = createGraphics(width, height);
  _frontLayer = createGraphics(width, height);
  
  _backLayer.colorMode(HSB);
  _midLayer.colorMode(HSB);
  _frontLayer.colorMode(HSB);
  colorMode(HSB);

  // get color
  _colorSet = GetColorSet();
  document.documentElement.style.setProperty('--somevar', `hsl(${_colorSet.potStrokeColorA.h}, ${_colorSet.potStrokeColorA.s}%, ${_colorSet.potStrokeColorA.b}%)`);
  document.documentElement.style.setProperty('--somevar2', `hsl(${_colorSet.flowerColor.h}, ${_colorSet.flowerColor.s}%, ${_colorSet.flowerColor.b}%)`);

  _backLayer.background(_colorSet.bgColor.h, _colorSet.bgColor.s, _colorSet.bgColor.b);

  let padding = 0.2 * min(width, height);

  // bg part
  let baseHeight = padding + 0.85 * (height - 1 * padding);

  let bgHeight = 0.06 * height;
  let xCount = width * random(0.6, 1.2);

  for (let x = 0; x < xCount; x++) {
    let yDotCount = bgHeight * dotDensity * 0.6;

    for (let y = 0; y < yDotCount; y++) {
      let t = tan(random(TWO_PI));

      let nowX = x * (width / (xCount - 1));
      let nowY = baseHeight - bgHeight * t - 0.2 * height;

      // _backLayer.noStroke();
      _backLayer.noFill();
      _backLayer.stroke(_colorSet.bgDotColor.h, _colorSet.bgDotColor.s, _colorSet.bgDotColor.b);
      _backLayer.circle(nowX, nowY, random(0, 2));
    }
  }
  UpdateLayers();


  let potCount = int(random(6, 12));
  // let potCount = 17;
  let potWidth = (width - padding * 2) / potCount;

  for (let i = 0; i < potCount; i++) {
    let potX = padding + (i + 0.5) * potWidth;
    let potY = baseHeight;

    let potHeight = random(0.4, 0.6) * potWidth;
    let newPot = new PotData(potX, potY, potWidth / 2, potHeight);

    await drawPot(newPot);
  }
  UpdateLayers();
}

function UpdateLayers () {
  background(0, 0, 100);
  image(_backLayer, 0, 0);
  image(_midLayer, 0, 0);
  image(_frontLayer, 0, 0);
}
// async sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}