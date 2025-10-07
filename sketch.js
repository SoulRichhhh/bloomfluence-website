// 抽象数字艺术作品 - P5.js实现
// 基于复杂有机图案、波浪条纹和故障效果的抽象艺术

let canvasWidth = 800;
let canvasHeight = 600;
let noiseScale = 0.008;
let time = 0;
let organicShapes = [];
let wavyLines = [];

// 颜色调色板
let colors = {
  red: [255, 80, 80],
  orange: [255, 140, 0],
  yellow: [255, 255, 80],
  white: [255, 255, 255],
  blue: [40, 120, 220],
  black: [15, 15, 15],
  brown: [120, 60, 20],
  darkBlue: [20, 40, 80]
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(RGB, 255);
  noLoop(); // 静态图像
  
  // 预生成有机形状数据
  generateOrganicShapes();
  generateWavyLines();
}

function draw() {
  background(20, 20, 30); // 深色背景
  
  // 绘制有机漩涡图案（左侧区域）
  drawOrganicPatterns();
  
  // 绘制波浪条纹图案（右侧区域）
  drawWavyPatterns();
  
  // 绘制故障效果
  drawGlitchEffects();
}

function generateOrganicShapes() {
  organicShapes = [];
  let leftBoundary = canvasWidth * 0.67;
  
  for (let layer = 0; layer < 4; layer++) {
    let layerShapes = [];
    for (let x = 0; x < leftBoundary; x += 6) {
      for (let y = 0; y < canvasHeight; y += 6) {
        let noiseVal = noise(x * noiseScale, y * noiseScale, layer * 0.3);
        
        if (noiseVal > 0.25) {
          let shape = {
            x: x,
            y: y,
            size: noiseVal * 25 + 5,
            layer: layer,
            color: getColorForPosition(x, y, leftBoundary),
            points: generateShapePoints(x, y, noiseVal * 25 + 5, layer)
          };
          layerShapes.push(shape);
        }
      }
    }
    organicShapes.push(layerShapes);
  }
}

function generateShapePoints(x, y, size, layer) {
  let points = [];
  let numPoints = 8 + layer * 2;
  
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI * i) / numPoints;
    let radius = size + noise(angle * 3, layer) * 8;
    let pointX = cos(angle) * radius;
    let pointY = sin(angle) * radius;
    points.push({x: pointX, y: pointY});
  }
  return points;
}

function generateWavyLines() {
  wavyLines = [];
  let rightStart = canvasWidth * 0.67;
  
  for (let y = 0; y < canvasHeight; y += 2) {
    let waveAmplitude = map(y, 0, canvasHeight, 3, 20);
    let waveFreq = map(y, 0, canvasHeight, 0.015, 0.04);
    let colorChoice = getWavyColorForY(y);
    
    let line = {
      y: y,
      amplitude: waveAmplitude,
      frequency: waveFreq,
      color: colorChoice,
      points: []
    };
    
    for (let x = rightStart; x < canvasWidth - 20; x += 1) {
      let waveY = y + sin(x * waveFreq) * waveAmplitude;
      line.points.push({x: x, y: waveY});
    }
    
    wavyLines.push(line);
  }
}

function drawOrganicPatterns() {
  // 绘制预生成的有机形状
  for (let layer = 0; layer < organicShapes.length; layer++) {
    push();
    strokeWeight(1.2 + layer * 0.3);
    noFill();
    
    for (let shape of organicShapes[layer]) {
      stroke(shape.color[0], shape.color[1], shape.color[2], 160 + layer * 20);
      
      push();
      translate(shape.x, shape.y);
      beginShape();
      for (let point of shape.points) {
        vertex(point.x, point.y);
      }
      endShape(CLOSE);
      pop();
    }
    pop();
  }
}

function drawWavyPatterns() {
  // 绘制预生成的波浪线条
  push();
  strokeWeight(1);
  noFill();
  
  for (let line of wavyLines) {
    stroke(line.color[0], line.color[1], line.color[2], 180);
    
    beginShape();
    for (let point of line.points) {
      vertex(point.x, point.y);
    }
    endShape();
  }
  
  // 添加一些不规则的深色斑块
  for (let i = 0; i < 12; i++) {
    let rightStart = canvasWidth * 0.67;
    let blobX = random(rightStart, canvasWidth - 50);
    let blobY = random(canvasHeight * 0.2, canvasHeight);
    let blobSize = random(15, 45);
    
    fill(colors.brown[0], colors.brown[1], colors.brown[2], 120);
    noStroke();
    ellipse(blobX, blobY, blobSize, blobSize * 0.6);
  }
  
  // 添加一些像素化的纹理
  for (let i = 0; i < 20; i++) {
    let rightStart = canvasWidth * 0.67;
    let pixelX = random(rightStart, canvasWidth - 10);
    let pixelY = random(canvasHeight * 0.4, canvasHeight);
    let pixelSize = random(2, 6);
    
    fill(colors.darkBlue[0], colors.darkBlue[1], colors.darkBlue[2], 100);
    noStroke();
    rect(pixelX, pixelY, pixelSize, pixelSize);
  }
  
  pop();
}

function drawGlitchEffects() {
  // 右侧边缘的垂直故障条
  let glitchWidth = canvasWidth * 0.1;
  let glitchX = canvasWidth - glitchWidth;
  
  push();
  noStroke();
  
  // 创建更复杂的故障效果
  for (let y = 0; y < canvasHeight; y += 1.5) {
    let colorChoice = getGlitchColor();
    let alpha = map(y, 0, canvasHeight, 100, 220);
    fill(colorChoice[0], colorChoice[1], colorChoice[2], alpha);
    rect(glitchX, y, glitchWidth, 1.5);
  }
  
  // 添加一些水平故障带
  for (let i = 0; i < 8; i++) {
    let glitchY = random(0, canvasHeight);
    let glitchHeight = random(2, 6);
    let glitchWidth = random(20, canvasWidth * 0.3);
    let glitchX = random(0, canvasWidth - glitchWidth);
    
    for (let x = glitchX; x < glitchX + glitchWidth; x += 1) {
      let colorChoice = getGlitchColor();
      fill(colorChoice[0], colorChoice[1], colorChoice[2], 120);
      rect(x, glitchY, 1, glitchHeight);
    }
  }
  
  // 添加一些随机的小故障点
  for (let i = 0; i < 50; i++) {
    let glitchX = random(0, canvasWidth);
    let glitchY = random(0, canvasHeight);
    let glitchSize = random(1, 3);
    let colorChoice = getGlitchColor();
    
    fill(colorChoice[0], colorChoice[1], colorChoice[2], 180);
    rect(glitchX, glitchY, glitchSize, glitchSize);
  }
  
  pop();
}

function getColorForPosition(x, y, leftBoundary) {
  // 根据位置返回颜色
  let xRatio = x / leftBoundary;
  let yRatio = y / canvasHeight;
  
  if (yRatio < 0.3) {
    // 顶部区域 - 红色和橙色
    if (xRatio < 0.5) {
      return colors.red;
    } else {
      return colors.orange;
    }
  } else if (yRatio < 0.7) {
    // 中部区域 - 橙色和黄色
    if (xRatio < 0.3) {
      return colors.orange;
    } else {
      return colors.yellow;
    }
  } else {
    // 底部区域 - 黄色和白色
    if (xRatio < 0.4) {
      return colors.yellow;
    } else {
      return colors.white;
    }
  }
}

function getWavyColorForY(y) {
  // 波浪图案的颜色根据Y位置变化
  let yRatio = y / canvasHeight;
  
  if (yRatio < 0.3) {
    return colors.orange;
  } else if (yRatio < 0.6) {
    return colors.yellow;
  } else {
    return colors.brown;
  }
}

function getGlitchColor() {
  // 随机选择故障效果颜色
  let colorOptions = [
    colors.blue,
    colors.orange,
    colors.black,
    colors.white,
    colors.red
  ];
  return colorOptions[floor(random(colorOptions.length))];
}

// 添加一些交互性
function mousePressed() {
  // 点击重新生成图案
  generateOrganicShapes();
  generateWavyLines();
  redraw();
}

// 键盘控制
function keyPressed() {
  if (key === 's' || key === 'S') {
    save('abstract_art.png');
  } else if (key === 'r' || key === 'R') {
    // 重新生成
    generateOrganicShapes();
    generateWavyLines();
    redraw();
  }
}
