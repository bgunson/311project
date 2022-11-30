
const MAX_SIZE = 960;

var verticies = [
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1]
];

class Cube {

    constructor(x, y) {
        this.dS = random(-2, 2);
        this.size = 1;
        this.angle = random(360);
        this.posX = x;
        this.posY = y;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        this.frame = new Array(12).fill(new Array(3).fill(1));
    }

    setStroke() {
        stroke(this.r+random(-80,80), this.g, this.b+random(-100, 100));
    }


    drawWireframe() {
        point(this.frame[0][0], this.frame[0][1]);
        // line(this.frame[0][0], this.frame[0][1], this.frame[1][0], this.frame[1][1]);
        // line(this.frame[1][0], this.frame[1][1], this.frame[2][0], this.frame[2][1]);
        // line(this.frame[2][0], this.frame[2][1], this.frame[3][0], this.frame[3][1]);
        // line(this.frame[3][0], this.frame[3][1], this.frame[0][0], this.frame[0][1]);

        // line(this.frame[4][0], this.frame[4][1], this.frame[5][0], this.frame[5][1]);
        // line(this.frame[5][0], this.frame[5][1], this.frame[6][0], this.frame[6][1]);
        // line(this.frame[6][0], this.frame[6][1], this.frame[7][0], this.frame[7][1]);
        // line(this.frame[7][0], this.frame[7][1], this.frame[4][0], this.frame[4][1]);

        // line(this.frame[0][0], this.frame[0][1], this.frame[4][0], this.frame[4][1]);
        // line(this.frame[1][0], this.frame[1][1], this.frame[5][0], this.frame[5][1]);
        // line(this.frame[2][0], this.frame[2][1], this.frame[6][0], this.frame[6][1]);
        // line(this.frame[3][0], this.frame[3][1], this.frame[7][0], this.frame[7][1]);
    }

    draw() {
        var cube_vertex = verticies.map(v => v.map(vv => vv*this.size));
        for (var i = 0; i < 8; i++) {

            var rot = this.angle * 0.0174532;
            var rotz = cube_vertex[i][2] * cos(rot) - cube_vertex[i][0] * sin(rot);
            var rotx = cube_vertex[i][2] * sin(rot) + cube_vertex[i][0] * cos(rot);
            var roty = cube_vertex[i][1];
            // rotateX
            var rotyy = roty * cos(rot) - rotz * sin(rot);
            var rotzzz = roty * sin(rot) + rotz * cos(rot);
            var rotxx = rotx;
            // rotateZ
            var rotxxx = rotxx * cos(rot) - rotyy * sin(rot);
            var rotyyy = rotxx * sin(rot) + rotyy * cos(rot);

            // orthographic projection
            rotxxx += this.posX;
            rotyyy += this.posY;

            this.frame[i][0] = rotxxx;
            this.frame[i][1] = rotyyy;
            this.frame[i][2] = rotzzz;
            // point(rotxxx, rotyyy);     // dots spiral
            line(this.posX, this.posY, rotxxx, rotyyy); // lines

        }
        this.angle += this.dS;
        // this.drawWireframe();
        // this.angle %= 360;

        //if (size <= 0 || size >= MAX_SIZE) {
        //  dS *= -1;
        //}
        if (this.size < MAX_SIZE)
            this.size += this.dS;
    }

}
