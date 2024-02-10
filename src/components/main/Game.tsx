import { useEffect, useRef, useState } from "react";
import Board from "../../utils/Board";
import Game from "../../utils/Game";
import { Player } from "../../utils/Entities";
import GameStats from "../game/GameStats";
import BoardComponent from "./Board";
import MovementPad from "../movement_gui/MovementPad";
import styles from "./game.module.css";

const GameComponent = () => {
  const [game, setGame] = useState(new Game(1, 15, undefined));
  const [board, setBoard] = useState(new Board(0, 2, 2));
  const [player, setPlayer] = useState(new Player(0, 0));
  const dimensions = calcDimensions();
  const gameRef = useRef(game);

  function calcDimensions(){
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if(viewportHeight>viewportWidth){
      return Math.min(viewportWidth*0.9, viewportHeight*0.6);
    }else{
      return Math.min(viewportWidth*0.6, viewportHeight*0.9);
    }
  }

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  function restartGame() {
    setGame(() => {
      const newGame = new Game(1, 10, undefined);
      let newBoard = newGame.startGame();
      newBoard.populateMaze();
      setBoard(newBoard);
      setPlayer(new Player(0, 0));
      return newGame;
    });
  }

  useEffect(() => {
    console.log(styles);
    restartGame();
  }, []);

  useEffect(() => {
    let newBoard = game.nextLevel(board, player);
    if (board != newBoard) {
      player.x = 0;
      player.y = 0;
      setPlayer(player);
    }
    setBoard(newBoard);
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      // Use the ref to access the current game state and decrement the timer
      gameRef.current.timer--;

      // Create a new game object with the updated timer value and set it
      const updatedGame = new Game(
        gameRef.current.level,
        gameRef.current.timer,
        gameRef.current.seed
      );
      setGame(updatedGame);

      // Check the updated timer value in the ref to restart the game
      if (gameRef.current.timer <= 0) {
        restartGame();
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={styles.gameComponent}>
      <div className={styles.left}>
        <div className={styles.restart}>
          <button onClick={restartGame}>Restart Game</button>
        </div>
        <div className={styles.stats}>
          <GameStats level={game.level} timer={game.timer} />
        </div>
      </div>
      <div className={styles.board}>
        <BoardComponent
          width={dimensions}
          height={dimensions}
          player={player}
          board={board}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.movement}>
          <MovementPad player={player} setPlayer={setPlayer} board={board} />
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
