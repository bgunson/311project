var cube;
var cubes = [];
let looping = false;

function mousePressed() {
    if (looping) {
      noLoop();
    } else {
      loop();
    }
    looping = !looping;
  }

function doubleClicked() {
    background(255);
}

function setup() {
    createCanvas(640, 480);
    background(255);

    var num = int(random(1, 10));
    for (var i = 0; i < num; i++) {
        var x = random(width);
        var y = random(height);
        cubes.push(new Cube(width / 2, height / 2));
    }


    cube = new Cube(x, y);
    noLoop();
}

function draw() {
    // background(0);
    // 40, 181, 70
    var r = 40;
    var g = 180;
    var b = 70;

    cubes.forEach(c => {
        // stroke(r+random(-80,80), g, b+random(-100, 100));
        // strokeWeight(2);
        c.setStroke();
        c.draw();
    });
    delay(50);
}

function delay(milliseconds) {
    var start = new Date().getTime();
    var stop = false;
    while (!stop) {
        if ((new Date().getTime() - start) > milliseconds) {
            stop = true;
        }
    }
}