function NYLerpHue(_hueA, _hueB, _t) {
  let hueA = _hueA;
  let hueB = _hueB;

  let hueDiff = abs(hueB - hueA);

  if (abs((hueB - 360) - hueA) < hueDiff) {
    hueB -= 360;
  }
  else if (abs((hueB + 360) - hueA) < hueDiff) {
    hueB += 360;
  }
  else {
    return lerp(_hueA, _hueB, _t);
  }

  let resultHue = lerp(hueA, hueB, _t);

  if (resultHue < 0) {
    resultHue += 360;
  }
  else if (resultHue > 360) {
    resultHue -= 360;
  }

  return resultHue;
}

function NYLerpColor(_colorA, _colorB, _t) {
  let _hue = NYLerpHue(_colorA.h, _colorB.h, _t);
  let _sat = lerp(_colorA.s, _colorB.s, _t);
  let _bri = lerp(_colorA.b, _colorB.b, _t);
  let _alpha = lerp(_colorA.a, _colorB.a, _t);

  return new NYColor(_hue, _sat, _bri, _alpha);
}

function NYLerpP5Color(_colorA, _colorB, _t) {
  let hueA = hue(_colorA);
  let hueB = hue(_colorB);

  let hueDiff = abs(hueB - hueA);

  if (abs((hueB - 360) - hueA) < hueDiff) {
    hueB -= 360;
  }
  else if (abs((hueB + 360) - hueA) < hueDiff) {
    hueB += 360;
  }
  else {
    return lerpColor(_colorA, _colorB, _t);
  }

  let satA = saturation(_colorA);
  let briA = brightness(_colorA);
  let alphaA = alpha(_colorA);

  let satB = saturation(_colorB);
  let briB = brightness(_colorB);
  let alphaB = alpha(_colorB);

  let resultHue = lerp(hueA, hueB, _t);
  let resultSat = lerp(satA, satB, _t);
  let resultBri = lerp(briA, briB, _t);
  let resultAlpha = lerp(alphaA, alphaB, _t);

  if (resultHue < 0) {
    resultHue += 360;
  }
  else if (resultHue > 360) {
    resultHue -= 360;
  }

  return color(resultHue, resultSat, resultBri, resultAlpha);
}

function hsbToRgb(_hue, _sat, _bri) {

  // Ensure that the input values are within the valid range
  let inputHue = processHue(_hue);
  let inputSat = Math.max(0, Math.min(100, _sat));
  let inputBri = Math.max(0, Math.min(100, _bri));

  // Convert saturation and brightness to values between 0 and 1
  inputSat /= 100;
  inputBri /= 100;

  // Calculate the chroma (color intensity)
  const chroma = inputSat * inputBri;

  // Calculate the hue sector
  const hueSector = inputHue / 60;

  // Calculate intermediate values
  const x = chroma * (1 - Math.abs((hueSector % 2) - 1));
  const m = inputBri - chroma;

  let r, g, b;

  // Determine the RGB values based on the hue sector
  if (0 <= hueSector && hueSector < 1) {
    r = chroma;
    g = x;
    b = 0;
  } else if (1 <= hueSector && hueSector < 2) {
    r = x;
    g = chroma;
    b = 0;
  } else if (2 <= hueSector && hueSector < 3) {
    r = 0;
    g = chroma;
    b = x;
  } else if (3 <= hueSector && hueSector < 4) {
    r = 0;
    g = x;
    b = chroma;
  } else if (4 <= hueSector && hueSector < 5) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }

  // Adjust the RGB values by adding the m (brightness minus chroma)
  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;

  // Ensure the RGB values are within the valid range (0 - 255)
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

function lchToRgb(lightness, chroma, hue) {
  // Ensure that the input values are within the valid range
  lightness = Math.max(0, Math.min(100, lightness));
  chroma = Math.max(0, Math.min(132, chroma));
  hue = (hue % 360 + 360) % 360; // Ensure hue is within the range 0-359

  // Convert chroma and lightness to values between 0 and 1
  chroma /= 132;
  lightness /= 100;

  // Calculate the angle in radians for the hue
  const hueRadians = (hue / 360) * (2 * Math.PI);

  // Calculate the intermediate values
  const x = chroma * Math.cos(hueRadians);
  const y = chroma * Math.sin(hueRadians);

  // Calculate the temporary values
  const temp1 = lightness * 2 - 1;
  const temp2 = chroma * (1 - Math.abs(2 * lightness - 1));

  // Calculate the RGB values
  let r, g, b;

  if (hue >= 0 && hue < 120) {
    r = temp2;
    g = temp1;
    b = 0;
  } else if (hue >= 120 && hue < 240) {
    r = 0;
    g = temp2;
    b = temp1;
  } else {
    r = temp1;
    g = 0;
    b = temp2;
  }

  // Adjust the RGB values
  r = (r + chroma) * 255;
  g = (g + chroma) * 255;
  b = (b + chroma) * 255;

  // Ensure the RGB values are within the valid range (0 - 255)
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

function processHue(_hue) {
  let result = (_hue % 360 + 360) % 360;
  return result;
}

// get angle between two points and return in degrees
function getAngle(_x1, _y1, _x2, _y2) {
  let xDiff = _x2 - _x1;
  let yDiff = _y2 - _y1;
  return atan2(yDiff, xDiff) * 180 / PI + 90;
}