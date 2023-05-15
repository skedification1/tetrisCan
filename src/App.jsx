import React from 'react';
import { useRef, useEffect, useState } from 'react';
import './App.css';
import useInterval from './useInterval';
import {
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
} from './Figures';
import StartEndGame from './StartEndGame';
function App() {
  const canvasRef = useRef(null);
  const canvas_size = [400, 800]; //25x25
  const scale1 = 40;
  const [speed, setSpeed] = React.useState(null);
  const [newFigure, setNewFigure] = React.useState(figureThree); // navigated figure
  const [tetrisMap, setTetrisMap] = React.useState([]); // figure renders

  const [tetrisLineMap, setTetrisLineMap] = React.useState([]); // figeure FNcs
  const [nameFigure, setNameFigure] = React.useState('figureThree'); //case for filters to shake

  const [score, setScore] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState('Start');

  const stepDown = (nav) => {
    if (borderChecker(nav) && tetris_mapChecker(nav)) {
      let tempFigure = newFigure;
      const result = tempFigure.map((fig) => ({ ...fig, y: fig.y + 1 }));
      setNewFigure(result);
    } else {
      setTetrisMap([...tetrisMap, ...newFigure]);
      randomNewFigure();

      console.log('ERROR_DOWN');
    }
  };

  const stepNav = (nav) => {
    if (borderChecker(nav) && tetris_mapChecker(nav)) {
      let tempFigure = newFigure;
      //const result = tempFigure.map((fig) => ({ ...fig, x: fig.x - 1 }));
      const result = tempFigure.map((fig) => ({
        x: fig.x + nav.x,
        y: fig.y + nav.y,
      }));
      setNewFigure(result);
    } else {
      console.log('ERROR_LEFT/RIGHT');
    }
  };

  const borderChecker = (nav) => {
    let checker = true;
    newFigure.map((figure) => {
      if (figure.x + nav.x >= 0 && figure.x + nav.x < 10 && figure.y + nav.y < 20) {
        //  console.log('figureris_figure ', figure);
      } else if (figure.y + nav.y === 19) {
        setTetrisMap([...tetrisMap, ...newFigure]);
        randomNewFigure();
      } else {
        console.log('figureris_figure ERROR', figure);
        checker = false;
      }
    });
    return checker;
  };

  const tetris_mapChecker = (nav) => {
    let checker = true;
    newFigure.map((figure) => {
      for (let i = 0; i < tetrisMap.length; i++) {
        if (figure.x + nav.x === tetrisMap[i].x && figure.y + nav.y === tetrisMap[i].y) {
          console.log('FIND BLOCK ', figure.x + nav.x, ' ', figure.y + nav.y);
          return (checker = false);
        } else {
          //    console.log('dont find block');
        }
      }
    });

    newFigure.map((figure) => {
      for (let i = 0; i < tetrisMap.length; i++) {
        if (figure.x === tetrisMap[i].x && figure.y === tetrisMap[i].y) {
          // alert('END');

          //gameStatus
          setGameStatus('GameOver');
          setSpeed(null);

          return (checker = false);
        }
      }
    });

    return checker;
  };

  const randomNewFigure = () => {
    if (gameStatus === 'Playing') {
      let ranNum = Math.floor(Math.random() * (7 - 0)) + 0;
      switch (ranNum) {
        case 0:
          // console.log('Oranges 0.');
          setNewFigure(figureRightStep);
          setNameFigure('figureRightStep');
          break;
        case 1:
          setNewFigure(figureLeftStep);
          setNameFigure('figureLeftStep');
          break;
        case 2:
          setNewFigure(figureLine);
          setNameFigure('figureLine');
          break;
        case 3:
          setNewFigure(figureLeftHorse);
          setNameFigure('figureLeftHorse');
          break;
        case 4:
          setNewFigure(figureRightHorse);
          setNameFigure('figureRightHorse');
          break;
        case 5:
          setNewFigure(figureCube);
          setNameFigure('figureCube');
          break;
        case 6:
          setNewFigure(figureThree);
          setNameFigure('figureThree');

          break;
        default:
          console.log('Oranges DEF.');
          break;
      }

      setStatusFigure(0);
      setSpeed(250);
      setScore(score + 10);
    } else if (gameStatus === 'Pause') {
      setSpeed(null);
    } else if (gameStatus === 'GameOver') {
      console.log('Pause_', gameStatus);
      setSpeed(null);
      setNewFigure([]);
      setTetrisMap([]);
      setTetrisLineMap([]);
    }
  };
  /////////////////////////////////////=======================

  const pauseGame = () => {
    if (gameStatus === 'Pause') {
      setSpeed(250);
      setGameStatus('Playing');
    } else {
      setSpeed(null);
      setGameStatus('Pause');
    }
  };

  const restartGame = () => {
    setStatusFigure(0);
    setNewFigure(figureThree);
    setNameFigure('figureThree');
    setTetrisMap([]);
    setTetrisLineMap([]);

    setSpeed(250);
    setGameStatus('Playing');
    setScore(0);
    lineChecker();
  };

  ///START
  const createLineMap = () => {
    let testArr = [];
    for (let i = 0; i < 10; i++) {
      testArr[i] = '_';
    }
    for (let t = 0, j = 0; t < 20; t++) {
      setTetrisLineMap((tetlineMap) => [...tetlineMap, testArr]);
    }
    console.log('createLineMap2_____', tetrisLineMap);
  };

  const setLineMap = () => {
    let tempArr = tetrisLineMap;
    for (let i = 0; i < tetrisMap.length; i++) {
      tempArr = tempArr.map((tetElemY, index) =>
        index === tetrisMap[i].y
          ? tetElemY.map((tetElemX, index) => (index === tetrisMap[i].x ? 'K' : tetElemX))
          : tetElemY,
      );
    }

    console.log('tempArr[0=9][0]========', tempArr);
    setTetrisLineMap(tempArr);
  };

  const lineChecker = () => {
    if (tetrisMap.length > 9) {
      let tempScore = 0;
      let tempArr = tetrisLineMap;
      let checkArr = [];
      let i = 0;
      tempArr.map((tetElemY, indY) => {
        let count = 0;
        checkArr[i] = false;
        tetElemY.map((tetElemX, indX) => {
          if (tetElemX === 'K') {
            count++;
          } else {
            count--;
          }
        });
        if (count === 10) {
          checkArr[i] = true;
        }
        i++;
      });
      ////////

      ///////

      for (let i = 0; i < checkArr.length; i++) {
        if (checkArr[i] === true) {
          console.log('true');
          tempArr.splice(i, 1);
          tempArr.unshift(tempArr[0]);
          // setTetrisLineMap(tetrisLineMap.splice(i, 1));
          // setTetrisLineMap(tetrisLineMap.unshift(tetrisLineMap[0]));
          tempScore = tempScore + 100;
          //setTetrisLineMap([['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'], ...setTetrisLineMap]);
        } else {
          console.log('false');
        }
        //setTetrisLineMap(tempArr);
      }
      //console.log('tempArr tempArr/tempArr ', tempArr);
      //console.log('AFTER SPLICE3 ', tetrisLineMap);
      if (tempScore > 300) {
        tempScore = 1000;
      }
      setScore(score + tempScore);
      createNewMapTetris();
    }
  };

  const createNewMapTetris = () => {
    let tempArr = tetrisLineMap;

    let newMapArr = [];
    let iter = 0;

    tempArr = tempArr.map((tetElemY, indY) => {
      tetElemY.map((tetElemX, indX) => {
        if (tetElemX === 'K') {
          newMapArr[iter] = { x: indX, y: indY };
          iter = iter + 1;
          //  return { x: indX, y: indY };
        }
      });
    });

    console.log('newMapArr_______', newMapArr);

    setTetrisMap(newMapArr);
  };

  useEffect(() => {
    if (tetrisLineMap.length === 0) {
      createLineMap();
    } else {
      //  changeLineMap();
      //setLineMap();
    }
    //
  }, [tetrisLineMap]);

  const handlerClicker = (e) => {
    if (gameStatus === 'Playing') {
      switch (e) {
        case 'ArrowUp':
          // pushUp();
          stepNav(navigation[3]);
          break;
        case 'ArrowDown':
          //  pushDown();
          stepDown(navigation[2]);
          break;
        case 'ArrowLeft':
          // pushLeft();
          stepNav(navigation[0]);
          break;
        case 'ArrowRight':
          // pushRight();
          stepNav(navigation[1]);
          break;
        case ' ':
          console.log('spaceeeee', e);
          setSpeed(10);
          break;
        case 'Control':
          // pushRight();
          shakeFigureFilter();
          break;

        default:
          console.log('default---------------', e);
      }
    }

    switch (e) {
      case 'Enter':
        pauseGame();
        break;

      default:
        console.log('default2----', e);
    }
  };

  const [statusFigure, setStatusFigure] = React.useState(0);

  const shakeFigureFilter = () => {
    switch (nameFigure) {
      case 'figureRightStep':
        shake_figureRightStep();
        break;
      case 'figureLeftStep':
        shake_figureLeftStep();
        break;
      case 'figureLine':
        shake_figureLine();
        break;
      case 'figureLeftHorse':
        shake_figureHorseLeft();
        break;
      case 'figureRightHorse':
        shake_figureHorseRight();
        break;
      case 'figureThree':
        shake_figureTree();
        break;

      default:
        console.log('default---------------');
    }

    // nameFigure
  };

  const shakeCheckerBorders = (figForSet) => {
    let check = true;
    figForSet.map((fig) => {
      if (fig.x >= 0 && fig.x < 10 && fig.y < 20) {
        console.log('TRUUUEE');
      } else {
        console.log('ERRRRRR');
        return (check = false);
      }
    });
    return check;
  };

  const shakeCheckerMap = (figForSet) => {
    let checker = true;
    figForSet.map((fig) => {
      for (let i = 0; i < tetrisMap.length; i++) {
        if (fig.x === tetrisMap[i].x && fig.y === tetrisMap[i].y) {
          console.log('FIND shake block ');
          return (checker = false);
        }
      }
    });
    return checker;
  };

  const shake_figureRightStep = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 1, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x - 1, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x - 2, y: tempFigure[3].y - 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(+1);
      }
    } else {
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 1, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 2, y: tempFigure[3].y + 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }

    // const figureRightStep2 = [
    //   { x: 4, y: 0 }, // x+0 y+0
    //   { x: 5, y: 0 }, // x+1 y-1
    //   { x: 4, y: 1 }, // x-1 y+0
    //   { x: 3, y: 1 }, // x2 y-1
    // ];
  };

  const shake_figureLeftStep = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      figureforeSet[0] = { x: tempFigure[0].x - 2, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 1, y: tempFigure[3].y - 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(+1);
      }
    } else {
      figureforeSet[0] = { x: tempFigure[0].x + 2, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 1, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x - 1, y: tempFigure[3].y + 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }

    // const figureLeftStep2 = [
    //   { x: 3, y: 0 }, // x-2 y +0
    //   { x: 4, y: 0 }, // x-1 y -1
    //   { x: 4, y: 1 }, // x+0 y +0
    //   { x: 5, y: 1 }, // x+1 y -1
    // ];
  };

  const shake_figureLine = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      figureforeSet[0] = { x: tempFigure[0].x + 1, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x - 1, y: tempFigure[2].y + 2 };
      figureforeSet[3] = { x: tempFigure[3].x - 2, y: tempFigure[3].y + 3 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(+1);
      }
    } else {
      figureforeSet[0] = { x: tempFigure[0].x - 1, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 1, y: tempFigure[2].y - 2 };
      figureforeSet[3] = { x: tempFigure[3].x + 2, y: tempFigure[3].y - 3 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }

    // const figureLine2 = [
    //   { x: 4, y: 0 }, // x+ 1 y +0
    //   { x: 4, y: 1 }, // x+0 y + 1
    //   { x: 4, y: 2 }, // x -1 y+2
    //   { x: 4, y: 3 }, // x-2 y +3
    // ];
  };

  const shake_figureHorseLeft = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      console.log('statusFigure==0', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x - 1, y: tempFigure[0].y + 1 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y - 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(1);
      }
    } else if (statusFigure === 1) {
      console.log('statusFigure==1', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 1, y: tempFigure[0].y - 1 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x - 1, y: tempFigure[2].y + 1 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y + 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(2);
      }
    } else if (statusFigure === 2) {
      console.log('statusFigure==2', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x - 1, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y - 2 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y - 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(3);
      }
    } else if (statusFigure === 3) {
      figureforeSet[0] = { x: tempFigure[0].x + 1, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 2, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 1, y: tempFigure[2].y + 1 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y + 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }

    // const figureLeftHorse2 = [
    //   { x: 3, y: 1 }, // x - 1 y +1
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
    //   { x: 3, y: 1 }, //x-1 y +0
    //   { x: 4, y: 0 }, // x+0 y-2
    //   { x: 5, y: 0 }, // x+0 y -2
    // ];

    // const figureLeftHorse = [
    //   { x: 4, y: 0 },  //x +1 y+0
    //   { x: 5, y: 0 }, //x+2 y-1
    //   { x: 5, y: 1 }, // x+1 y +1
    //   { x: 5, y: 2 }, //x +0 y +2
    // ];
  };

  const shake_figureHorseRight = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      console.log('statusFigure==0', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 1, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y - 1 };
      figureforeSet[3] = { x: tempFigure[3].x - 1, y: tempFigure[3].y - 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(1);
      }
    } else if (statusFigure === 1) {
      console.log('statusFigure==1', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x + 1, y: tempFigure[2].y + 2 };
      figureforeSet[3] = { x: tempFigure[3].x + 1, y: tempFigure[3].y + 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(2);
      }
    } else if (statusFigure === 2) {
      console.log('statusFigure==2', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 1 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x - 2, y: tempFigure[2].y - 1 };
      figureforeSet[3] = { x: tempFigure[3].x - 1, y: tempFigure[3].y - 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(3);
      }
    } else if (statusFigure === 3) {
      console.log('statusFigure==2', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y - 1 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 1, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 1, y: tempFigure[3].y + 2 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }
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
    //   { x: 4, y: 1 }, // x-1 y +0
    //   { x: 3, y: 1 }, //x-2 y -1
    //   { x: 3, y: 0 }, // x-1 y -2
    // ];

    // const figureRightHorse = [
    //   { x: 5, y: 0 },  // x+ 0 y -1
    //   { x: 4, y: 0 }, // x+0 y -1
    //   { x: 4, y: 1 }, // x+1 y+0
    //   { x: 4, y: 2 }, // x +1 y +2
    // ];
  };

  const shake_figureTree = () => {
    let figureforeSet = [];
    let tempFigure = newFigure;
    if (statusFigure === 0) {
      console.log('statusFigure==0', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 1, y: tempFigure[1].y + 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y + 0 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        console.log(newFigure);
        setStatusFigure(1);
      }
    } else if (statusFigure === 1) {
      console.log('statusFigure==1', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x - 1, y: tempFigure[0].y + 1 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 0, y: tempFigure[3].y + 0 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(2);
      }
    } else if (statusFigure === 2) {
      console.log('statusFigure==2', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 0, y: tempFigure[0].y + 0 };
      figureforeSet[1] = { x: tempFigure[1].x + 0, y: tempFigure[1].y + 0 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x - 1, y: tempFigure[3].y - 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(3);
      }
    } else if (statusFigure === 3) {
      console.log('statusFigure==2', statusFigure);
      figureforeSet[0] = { x: tempFigure[0].x + 1, y: tempFigure[0].y - 1 };
      figureforeSet[1] = { x: tempFigure[1].x - 1, y: tempFigure[1].y - 1 };
      figureforeSet[2] = { x: tempFigure[2].x + 0, y: tempFigure[2].y + 0 };
      figureforeSet[3] = { x: tempFigure[3].x + 1, y: tempFigure[3].y + 1 };

      if (shakeCheckerBorders(figureforeSet) && shakeCheckerMap(figureforeSet)) {
        setNewFigure(figureforeSet);
        setStatusFigure(0);
      }
    }

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

    // const figureThree = [
    //   { x: 4, y: 0 }, // x+1 y-1
    //   { x: 3, y: 1 }, // x-1 y-1
    //   { x: 4, y: 1 }, // x+0 y +0
    //   { x: 5, y: 1 }, // x+1 y +1
    // ];
  };

  useInterval(() => {
    lineChecker();
    stepDown(navigation[2]);

    // lineChecker();
  }, speed);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    if (gameStatus != 'GameOver') {
      context.setTransform(scale1, 0, 0, scale1, 0, 0);
      context.clearRect(0, 0, canvas_size[0], canvas_size[1]);
      context.fillStyle = 'lightgreen';
      // console.log('tetrisMap______', tetrisMap);
      tetrisMap.forEach((index) => {
        context.fillRect(index.x, index.y, 1, 1);
      });

      context.fillStyle = 'red';
      newFigure.forEach((index) => {
        context.fillRect(index.x, index.y, 1, 1);
      });

      setLineMap();
    } else {
      context.setTransform(20, 0, 0, 20, 0, 0);
      context.fillStyle = 'purple';
      gameOverFigure.forEach((index) => {
        context.fillRect(index.x, index.y, 1, 1);
      });
    }
  }, [newFigure, tetrisMap, gameStatus]);

  return (
    <div
      className="container"
      onKeyUp={(e) => {
        handlerClicker(e.key);
      }}
      tabIndex="0">
      <div className="App">
        <div className="score">Score: {score} </div>
        <canvas
          className="bcgForm"
          style={{ border: '3px solid purple' }}
          ref={canvasRef}
          width={`${canvas_size[0]}px`}
          height={`${canvas_size[1]}px`}></canvas>
        <StartEndGame
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          score={score}
          restartGame={restartGame}
          pauseGame={pauseGame}
        />
        <div className="btnsPanel">
          <button
            className="btn"
            onClick={() => {
              stepDown(navigation[2]);
            }}>
            Down
          </button>
          <button
            className="btn"
            onClick={() => {
              stepNav(navigation[0]);
            }}>
            Left
          </button>
          <button
            className="btn"
            onClick={() => {
              stepNav(navigation[1]);
            }}>
            Right
          </button>
          <button
            className="btn"
            onClick={() => {
              stepNav(navigation[3]);
            }}>
            UP
          </button>
          <button
            className="btn"
            onClick={() => {
              // randomNewFigure();
              pauseGame();
            }}>
            Pause
          </button>
          <button
            className="btn"
            onClick={() => {
              restartGame();
            }}>
            Restart
          </button>
          <button
            className="btn"
            onClick={() => {
              shakeFigureFilter();
            }}>
            Shake
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
