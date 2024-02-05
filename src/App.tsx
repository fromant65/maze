import { useEffect, useState } from 'react'
import './App.css'
import Board from './utils/Board'
import { Cell } from './components/Cell';

function App() {
  const [board,setBoard] = useState(new Board(1,1,1));
  useEffect(()=>{
    let [h, w] = [30,30];
    let newBoard = new Board(0,h,w)
    newBoard.populateMaze();
    newBoard.grid[0][0].top=false;
    newBoard.grid[h-1][w-1].bottom=false;
    setBoard(newBoard);
    //console.log(board.grid);
  },[])
  return (
    <>
    <div>Board:</div>
    <div className='board'>
      {board.grid.map(row=>{
        return <div className='row'>
          {row.map(cell=>{
          return <Cell key={`r${cell.x}c${cell.y}`} w= {board.width} h= {board.height} left={cell.left} right={cell.right} top={cell.top} bottom={cell.bottom}/>
        })}
        </div> 
      })}
    </div>
    </>
  )
}

export default App
