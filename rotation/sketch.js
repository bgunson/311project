// Daniel Shiffman / Coding Train
// Coding Challenge #112: 3D Rendering with Rotation and Projection
// https://thecodingtrain.com/challenges/112-3d-rendering-with-rotation-and-projection
// https://youtu.be/p4Iz0XJY-Qk
// p5: https://editor.p5js.org/codingtrain/sketches/r8l8XXD2A

// JavaScript transcription: Chuck England

let angle = 0;

let points = [];

function setup() {
  createCanvas(640, 480);

  points[0] = createVector(-0.5, -0.5, -0.5);
  points[1] = createVector(0.5, -0.5, -0.5);
  points[2] = createVector(0.5, 0.5, -0.5);
  points[3] = createVector(-0.5, 0.5, -0.5);
  points[4] = createVector(-0.5, -0.5, 0.5);
  points[5] = createVector(0.5, -0.5, 0.5);
  points[6] = createVector(0.5, 0.5, 0.5);
  points[7] = createVector(-0.5, 0.5, 0.5);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  const rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1],
  ];

  const rotationX = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)],
  ];

  const rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)],
  ];

  let projected = [];

  for (let i = 0; i < points.length; i++) {
    let rotated = matmul(rotationY, points[i]);
    rotated = matmul(rotationX, rotated);
    rotated = matmul(rotationZ, rotated);
    let distance = 2;
    let z = 1 / (distance - rotated.z);
    const projection = [
      [z, 0, 0],
      [0, z, 0],
    ];    
    let projected2d = matmul(projection, rotated);

    projected2d.mult(300);
    projected[i] = projected2d;
    //point(projected2d.x, projected2d.y);
  }

  // for (let i = 0; i < projected.length; i++) {
  //   stroke(0, 255);
  //   strokeWeight(16);
  //   noFill();
  //   const v = projected[i];
  //   point(v.x, v.y);
  // }

  // Connecting
  for (let i = 0; i < 4; i++) {
    connect(i, (i + 1) % 4, projected);
    connect(i + 4, ((i + 1) % 4) + 4, projected);
    connect(i, i + 4, projected);
  }

  angle += 0.01;
}

function connect(i, j, points) {
  const a = points[i];
  const b = points[j];
  strokeWeight(1);
  stroke(0, 255, 0);
  line(a.x, a.y, b.x, b.y);
}
