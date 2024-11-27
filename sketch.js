let centreX, centreY, r;
let rNoise;

// 线段数量
let segments = 10;

let txt = "！謹賀新年！";
let textRadius; // 文字路径的半径

  
function setup() {
  // 创建画布
  createCanvas(windowWidth, windowHeight);

  // 画布中心
  centreX = windowWidth / 2;
  centreY = windowHeight / 2;

  // 设置半径和噪声半径
  r = 150;
  rNoise = 80;

  // 文字路径半径比形状半径更大
  textRadius = r + 18;

  // 设置文本字体和大小
  textFont('Helvetica');
  textSize(60);
}

function draw() {
  // 白色背景
  background(255);
  
   // 动态调整噪音半径（通过正弦波动来模拟大小变化）

  let noiseAmplitude = 100; // 噪音幅度

  let noiseSpeed = 0.01; // 噪音变化速度

  rNoise = 80 + noiseAmplitude * sin(frameCount * noiseSpeed)

  // 设置填充背景并去掉边框
  fill(57, 255, 20);
  noStroke();

  // 开始绘制形状
  beginShape();
  for (let i = 0; i < segments; i++) {
    let p = shapeNoise(i / segments);
    vertex(p.x, p.y);
  }
  endShape(CLOSE); // 结束形状绘制

  // 绘制蛇的舌头
  drawSnakeTongue();

  // 绘制环绕绿色图形的文字
  let txtPos = atan2(mouseY - centreY, mouseX - centreX) / TWO_PI;
  let txtWid = 1 / (textRadius * TWO_PI);

  for (let j = 0; j < txt.length; j++) {
    let charWidth = textWidth(txt.charAt(j));
    txtPos += charWidth / 2 * txtWid;

    let leftP = shapeNoiseWithRadius(txtPos - 0.01, textRadius);
    let rightP = shapeNoiseWithRadius(txtPos + 0.01, textRadius);
    let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;

    push();
    let p = shapeNoiseWithRadius(txtPos, textRadius);
    translate(p.x, p.y);
    rotate(angle);
    translate(-p.x, -p.y);

    text(txt.charAt(j), p.x - charWidth / 2, p.y);
    pop();

    txtPos += charWidth / 2 * txtWid;
  }
}

function drawSnakeTongue() {
  // 计算舌头方向，指向鼠标
  let tongueAngle = atan2(mouseY - centreY, mouseX - centreX);

  // 舌头主干长度和宽度
  let tongueLength = 30;
  let tongueWidth = 15;

  // 舌尖分叉的参数
  let forkLength = 10; // 分叉长度
  let forkWidth = 15; // 分叉宽度

  // 舌头的起点
  let startX = centreX;
  let startY = centreY;

  // 舌头的主干终点
  let endX = startX + tongueLength * cos(tongueAngle);
  let endY = startY + tongueLength * sin(tongueAngle);

  push();
  translate(startX, startY);
  rotate(tongueAngle);

  // 设置舌头颜色
  fill(255, 0, 0);
  noStroke();

  // 绘制舌头主干
  rect(0, -tongueWidth / 2, tongueLength, tongueWidth);

  // 绘制舌头分叉（两个三角形）
  beginShape();
  vertex(tongueLength, -tongueWidth / 2);
  vertex(tongueLength + forkLength, -forkWidth / 2);
  vertex(tongueLength, 0);
  endShape(CLOSE);

  beginShape();
  vertex(tongueLength, 0);
  vertex(tongueLength + forkLength, forkWidth / 2);
  vertex(tongueLength, tongueWidth / 2);
  endShape(CLOSE);

  pop();
}

function shapeNoise(n) {
  let noiseScale = 1.5;
  let angle = n * TWO_PI;

  let noiseValue = noise(
    noiseScale * cos(angle) + noiseScale,
    noiseScale * sin(angle) + noiseScale,
    frameCount / 100
  );

  let radius = r + rNoise * noiseValue;

  return {
    x: radius * cos(angle) + centreX,
    y: radius * sin(angle) + centreY,
  };
}

function shapeNoiseWithRadius(n, radius) {
  let noiseScale = 1.5;
  let angle = n * TWO_PI;

  let noiseValue = noise(
    noiseScale * cos(angle) + noiseScale,
    noiseScale * sin(angle) + noiseScale,
    frameCount / 100
  );

  radius = radius + rNoise * noiseValue;

  return {
    x: radius * cos(angle) + centreX,
    y: radius * sin(angle) + centreY,
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centreX = windowWidth / 2;
  centreY = windowHeight / 2;
}


