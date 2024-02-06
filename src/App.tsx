import { useEffect, useState } from "react";
import "./App.css";
import Board from "./utils/Board";
import { Player } from "./utils/Entities";
import MovementPad from "./components/MovementPad";
import BoardComponent from "./components/Board";

function App() {
  const [board, setBoard] = useState(new Board(1, 1, 1));
  const [player, setPlayer] = useState(new Player(0, 0));

  useEffect(() => {
    let [h, w] = [40, 40];
    let seed = Math.floor(Math.random()*Math.pow(2,31));
    let newBoard = new Board(seed, h, w);
    newBoard.populateMaze();
    newBoard.grid[0][0].top = false;
    newBoard.grid[h - 1][w - 1].bottom = false;
    setBoard(newBoard);
  }, []);

  return (
    <>
      <div>Board:</div>
      <BoardComponent player={player} board={board}/>
      <MovementPad player={player} setPlayer={setPlayer} board={board} />
    </>
  );
}

export default App;
