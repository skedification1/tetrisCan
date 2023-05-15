const figureRightStep = [
  { x: 4, y: 0 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
  { x: 5, y: 2 },
];

// const figureRightStep2 = [
//   { x: 4, y: 0 }, // x+0 y+0
//   { x: 5, y: 0 }, // x+1 y-1
//   { x: 4, y: 1 }, // x-1 y+0
//   { x: 3, y: 1 }, // x-2 y-1
// ];

const figureLeftStep = [
  { x: 5, y: 0 },
  { x: 5, y: 1 },
  { x: 4, y: 1 },
  { x: 4, y: 2 },
];
// const figureLeftStep2 = [
//   { x: 3, y: 0 }, // x-2 y +0
//   { x: 4, y: 0 }, // x-1 y -1
//   { x: 4, y: 1 }, // x+0 y +0
//   { x: 5, y: 1 }, // x+1 y -1
// ];

const figureLine = [
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
];
// const figureLine2 = [
//   { x: 4, y: 0 }, // x+ 1 y +0
//   { x: 4, y: 1 }, // x+0 y + 1
//   { x: 4, y: 2 }, // x -1 y+2
//   { x: 4, y: 3 }, // x-2 y +3
// ];

const figureLeftHorse = [
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 5, y: 1 },
  { x: 5, y: 2 },
];
// const figureLeftHorse2 = [
//   { x: 3, y: 1 }, // x -1  y +1
//   { x: 4, y: 1 }, // x-1 y+1
//   { x: 5, y: 1 }, // x+0 y+0
//   { x: 5, y: 0 }, //x+0 y-2
// ];

// const figureLeftHorse3 = [
//   { x: 4, y: 0 }, // x+1 y -1
//   { x: 4, y: 1 }, // x+0 y +0
//   { x: 4, y: 2 }, // x-1 y+1
//   { x: 5, y: 2 }, //x+0 y+2
// ];
// const figureLeftHorse4 = [
//   { x: 3, y: 0 }, // x-1 y +0
//   { x: 3, y: 1 }, //x+1 y +0
//   { x: 4, y: 0 }, // x+0 y-2
//   { x: 5, y: 0 }, // x+0 y -2
// ];

const figureRightHorse = [
  { x: 5, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 1 },
  { x: 4, y: 2 },
];

// const figureRightHorse2 = [
//   { x: 5, y: 0 }, //x + 0 y+0
//   { x: 5, y: 1 }, // x+1 y +1
//   { x: 4, y: 0 }, //x+ 0 y -1
//   { x: 3, y: 0 }, // x-1 y -2
// ];
// const figureRightHorse3 = [
//   { x: 5, y: 0 }, //x + 0 y+0
//   { x: 5, y: 1 }, // x+0 y +0
//   { x: 5, y: 2 }, //x+ 1 y +2
//   { x: 4, y: 2 }, // x+1 y +2
// ];
// const figureRightHorse4 = [
//   { x: 5, y: 1 }, //x + 0 y+1
//   { x: 4, y: 1 }, // x-1 y +1
//   { x: 3, y: 1 }, //x-2 y -1
//   { x: 3, y: 0 }, // x-1 y -2
// ];

const figureCube = [
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
];

const figureThree = [
  { x: 4, y: 0 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
];

// const figureThree2 = [
//   { x: 4, y: 0 },
//   { x: 4, y: 2 }, // x+1 y+1
//   { x: 4, y: 1 },
//   { x: 5, y: 1 },
// ];

// const figureThree3 = [
//   { x: 3, y: 1 }, // x-1 y+1
//   { x: 4, y: 2 },
//   { x: 4, y: 1 },
//   { x: 5, y: 1 },
// ];
// const figureThree4 = [
//   { x: 3, y: 1 },
//   { x: 4, y: 2 },
//   { x: 4, y: 1 },
//   { x: 4, y: 0 }, //x-1 y -1
// ];

const testFigure = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 8, y: 0 },
  { x: 9, y: 0 },
];
//8
const gameOverFigure = [
  /////G
  { x: 0, y: 8 },
  { x: 1, y: 8 },
  { x: 2, y: 8 },
  { x: 3, y: 8 },

  { x: 0, y: 9 },
  { x: 0, y: 10 },
  { x: 0, y: 11 },
  { x: 0, y: 12 },
  { x: 0, y: 13 },

  { x: 1, y: 13 },
  { x: 2, y: 13 },
  { x: 3, y: 13 },
  { x: 3, y: 12 },
  { x: 3, y: 11 },
  { x: 2, y: 11 },
  /////====A======

  { x: 5, y: 8 },
  { x: 6, y: 8 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },

  { x: 8, y: 9 },
  { x: 8, y: 10 },
  { x: 8, y: 11 },
  { x: 8, y: 12 },
  { x: 8, y: 13 },

  { x: 5, y: 9 },
  { x: 5, y: 10 },
  { x: 5, y: 11 },
  { x: 5, y: 12 },
  { x: 5, y: 13 },

  { x: 6, y: 11 },
  { x: 7, y: 11 },
  /////====MMMM======
  { x: 10, y: 8 },
  { x: 10, y: 9 },
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
  { x: 10, y: 13 },

  { x: 14, y: 8 },
  { x: 14, y: 9 },
  { x: 14, y: 10 },
  { x: 14, y: 11 },
  { x: 14, y: 12 },
  { x: 14, y: 13 },

  { x: 11, y: 9 },
  { x: 12, y: 10 },
  { x: 13, y: 9 },

  ////=========EEEE
  { x: 16, y: 8 },
  { x: 17, y: 8 },
  { x: 18, y: 8 },

  { x: 16, y: 10 },
  { x: 17, y: 10 },
  { x: 18, y: 10 },

  { x: 16, y: 13 },
  { x: 17, y: 13 },
  { x: 18, y: 13 },

  { x: 16, y: 9 },
  { x: 16, y: 11 },
  { x: 16, y: 12 },

  //================O
  { x: 1, y: 15 },
  { x: 2, y: 15 },
  { x: 3, y: 15 },
  { x: 4, y: 15 },

  { x: 1, y: 20 },
  { x: 2, y: 20 },
  { x: 3, y: 20 },
  { x: 4, y: 20 },

  { x: 1, y: 16 },
  { x: 1, y: 17 },
  { x: 1, y: 18 },
  { x: 1, y: 19 },

  { x: 4, y: 16 },
  { x: 4, y: 17 },
  { x: 4, y: 18 },
  { x: 4, y: 19 },

  //======V

  { x: 6, y: 15 },
  { x: 6, y: 16 },
  { x: 6, y: 17 },
  { x: 6, y: 18 },

  { x: 10, y: 15 },
  { x: 10, y: 16 },
  { x: 10, y: 17 },
  { x: 10, y: 18 },

  { x: 7, y: 19 },
  { x: 9, y: 19 },
  { x: 8, y: 20 },

  ///==========E

  { x: 12, y: 15 },
  { x: 13, y: 15 },
  { x: 14, y: 15 },

  { x: 12, y: 17 },
  { x: 13, y: 17 },
  { x: 14, y: 17 },

  { x: 12, y: 20 },
  { x: 13, y: 20 },
  { x: 14, y: 20 },

  { x: 12, y: 16 },
  { x: 12, y: 18 },
  { x: 12, y: 19 },
  ///========R

  { x: 16, y: 15 },
  { x: 17, y: 15 },
  { x: 18, y: 15 },

  { x: 16, y: 16 },
  { x: 16, y: 17 },
  { x: 16, y: 18 },
  { x: 16, y: 19 },
  { x: 16, y: 20 },

  { x: 19, y: 16 },
  { x: 19, y: 17 },

  { x: 17, y: 18 },
  { x: 18, y: 18 },

  { x: 18, y: 19 },
  { x: 19, y: 19 },
  { x: 19, y: 20 },
];

const navigation = [
  { x: -1, y: 0 }, //left
  { x: +1, y: 0 }, //right
  { x: 0, y: +1 }, // down
  { x: 0, y: -1 }, // up
];

export {
  figureRightStep,
  figureLeftStep,
  figureLine,
  figureLeftHorse,
  figureRightHorse,
  figureCube,
  figureThree,
  testFigure,
  navigation,
  gameOverFigure,
};
