int MAX_SIZE = width*2;

int verticies[][] = {
    {-1, -1, 1},
    {1, -1, 1},
    {1, 1, 1},
    {-1, 1, 1},
    {-1, -1, -1},  
    {1, -1, -1},
    {1, 1, -1},
    {-1, 1, -1}
   };

void setup() {
  size(640, 480); 
  background(0);
}

int size = 1;
float dA = random(-2, 2);
int dS = (int)random(1, 10);
float rot, rotx, roty, rotz, rotxx, rotyy, rotxxx, rotyyy, rotzzz;
float angle = 0;
int wireframe[][] = new int[12][3];


int [][] makeCube() {
  int cube[][] = new int[8][3];
  
  for (int i = 0; i < cube.length; i++) {
    for (int j = 0; j < cube[i].length; j++) {
      cube[i][j] = verticies[i][j] * size;
    }
  }
   
  return cube;
}

void drawWireframe(int frame[][]) {
    line(frame[0][0], frame[0][1], frame[1][0], frame[1][1]);
    line(frame[1][0], frame[1][1], frame[2][0], frame[2][1]);
    line(frame[2][0], frame[2][1], frame[3][0], frame[3][1]);
    line(frame[3][0], frame[3][1], frame[0][0], frame[0][1]);

    line(frame[4][0], frame[4][1], frame[5][0], frame[5][1]);
    line(frame[5][0], frame[5][1], frame[6][0], frame[6][1]);
    line(frame[6][0], frame[6][1], frame[7][0], frame[7][1]);
    line(frame[7][0], frame[7][1], frame[4][0], frame[4][1]);

    line(frame[0][0], frame[0][1], frame[4][0], frame[4][1]);
    line(frame[1][0], frame[1][1], frame[5][0], frame[5][1]);
    line(frame[2][0], frame[2][1], frame[6][0], frame[6][1]);
    line(frame[3][0], frame[3][1], frame[7][0], frame[7][1]);
}

void draw() {
  if (frameCount % 72 == 0) background(0);
  stroke(0, 255, 0);
  int cube_vertex[][] = this.makeCube();
  for (int i = 0; i < 8; i++) {
      rot = angle * 0.0174532;
      rotz = cube_vertex[i][2] * cos(rot) - cube_vertex[i][0] * sin(rot);
      rotx = cube_vertex[i][2] * sin(rot) + cube_vertex[i][0] * cos(rot);
      roty = cube_vertex[i][1];
      // rotateX
      rotyy = roty * cos(rot) - rotz * sin(rot);
      rotzzz = roty * sin(rot) + rotz * cos(rot);
      rotxx = rotx;
      // rotateZ
      rotxxx = rotxx * cos(rot) - rotyy * sin(rot);
      rotyyy = rotxx * sin(rot) + rotyy * cos(rot);

      // orthographic projection
      rotxxx += width / 2;
      rotyyy += height / 2;
      wireframe[i][0] = (int)rotxxx;
      wireframe[i][1] = (int)rotyyy;
      wireframe[i][2] = (int)rotzzz;
    }
    angle += dA;
    angle %= 360;
    drawWireframe(wireframe);
    
    if (size < 0 || size > MAX_SIZE) {
      dS *= -1;
      dA = random(-2, 2);
    }
    size += dS;
    delay(20);
  }
