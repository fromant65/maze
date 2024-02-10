import { Player } from "../../utils/Entities";
import Board from "../../utils/Board";
import { useEffect } from "react";
import styles from "./movementPad.module.css";

interface State {
  player: Player;
  setPlayer: Function;
  board: Board;
  isPaused: boolean
}

const MovementPad = ({ player, setPlayer, board, isPaused }: State) => {
  function handleKeyDown(e: any) {
    switch (e.key) {
      case "w":
      case "ArrowUp":
        checkMovement("u");
        break;
      case "a":
      case "ArrowLeft": 
        checkMovement("l");
        break;
      case "s" :
      case "ArrowDown":
        checkMovement("d");
        break;
      case "d":
      case "ArrowRight": 
        checkMovement("r");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if(!isPaused){
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function checkMovement(movement: string) {
    let x = player.x;
    let y = player.y;
    let newPlayer = new Player(x, y);
    newPlayer.move(board, movement);
    setPlayer(newPlayer);
  }
  return (
    <div className={styles.container}>
  <div className={styles.row}>
    <button className={styles.button} onClick={() => checkMovement("u")}>↑</button>
  </div>
  <div className={styles.row}>
    <button className={styles.button} onClick={() => checkMovement("l")}>←</button>
    <button className={styles.button} onClick={() => checkMovement("r")}>→</button>
  </div>
  <div className={styles.row}>
    <button className={styles.button} onClick={() => checkMovement("d")}>↓</button>
  </div>
</div>
  );
};

export default MovementPad;
