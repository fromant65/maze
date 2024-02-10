import { useEffect, useRef, useState } from "react";
import Board from "../../utils/Board";
import Game from "../../utils/Game";
import { Player } from "../../utils/Entities";
import GameStats from "../game/GameStats";
import BoardComponent from "./Board";
import MovementPad from "../movement_gui/MovementPad";
import styles from "./race.module.css";

const GameComponent = () => {
  const [game, setGame] = useState(new Game(1, 15, undefined));
  const [board, setBoard] = useState(new Board(0, 2, 2));
  const [player, setPlayer] = useState(new Player(0, 0));
  const [isPaused, setIsPaused] = useState(true);
  const dimensions = calcDimensions();
  const gameRef = useRef(game);

  function calcDimensions() {
    const viewportWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const viewportHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    if (viewportHeight > viewportWidth) {
      return Math.min(viewportWidth * 0.9, viewportHeight * 0.6);
    } else {
      return Math.min(viewportWidth * 0.6, viewportHeight * 0.8);
    }
  }

  const playGame = () => {
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(true);
  };

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
    gameRef.current = game;
  }, [game]);

  useEffect(() => {
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
    let timerId: number;

    if (!isPaused) {
      timerId = setInterval(() => {
        // Use the ref to access the current game state and decrement the timer
        gameRef.current.timer -= 0.1;
        gameRef.current.timer = parseFloat(gameRef.current.timer.toFixed(1));
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
      }, 100);
    }

    // Clear the interval when the component unmounts or when isPaused changes
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isPaused]);

  return (
    <div className={styles.gameComponent}>
      <div className={styles.side}>
        <div className={styles.restart}>
          <button onClick={restartGame}>Restart Game</button>
        </div>
        <div className={styles.stats}>
          <GameStats level={game.level} timer={game.timer} />
        </div>
        <div className={styles.controls}>
          <button onClick={playGame}>Play</button>
          <button onClick={pauseGame}>Pause</button>
        </div>
        <div className={styles.movement}>
          <MovementPad
            player={player}
            setPlayer={setPlayer}
            board={board}
            isPaused={isPaused}
          />
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
    </div>
  );
};

export default GameComponent;
