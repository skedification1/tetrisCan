import React from 'react';

const StartEndGame = ({ gameStatus, setGameStatus, score, restartGame, pauseGame }) => {
  return gameStatus === 'Start' ? (
    <div className="startEnd1">
      <div className="rules">
        <div>
          <span>Navigation:</span>
        </div>
        <div>
          <span>Arrow-down to - Down</span>
        </div>
        <div>
          <span>Arrow-left/right to - Left/Right</span>
        </div>
        <div>
          <span>Space to - fast-down Figure</span>
        </div>
        <div>
          <span>Left-ctrl - to Shake figure</span>
        </div>
        <div>
          <span>Enter - to Pause Game</span>
        </div>
      </div>

      <button
        className="btn btn_start"
        onClick={() => {
          restartGame();
        }}>
        Start Game
      </button>
    </div>
  ) : gameStatus === 'GameOver' ? (
    <div className="startEnd1">
      <div className="rules">
        <div> GAME OVER </div>
        <div> Your Score is: {score} </div>
      </div>

      <button
        className="btn btn_start"
        onClick={() => {
          restartGame();
        }}>
        Restart Game
      </button>
    </div>
  ) : gameStatus === 'Pause' ? (
    <div className="startEnd1">
      <div className="rules">
        <div> Pause... </div>
        <div> Your Score is: {score} </div>
      </div>

      <button
        className="btn btn_start"
        onClick={() => {
          pauseGame();
        }}>
        Continue Game
      </button>
    </div>
  ) : null;
};

export default StartEndGame;
