import { useEffect, useState } from 'react'
import './App.css'
import Board from './utils/Board'
import { Cell } from './components/Cell';
import { Player } from './utils/Entities';

function App() {
  const [board,setBoard] = useState(new Board(1,1,1));
  const [player, setPlayer] = useState(new Player(0,0));
  useEffect(()=>{
    let [h, w] = [5,5];
    let newBoard = new Board(1,h,w)
    newBoard.populateMaze();
    newBoard.grid[0][0].top=false;
    newBoard.grid[h-1][w-1].bottom=false;
    setBoard(newBoard);
    //console.log(board.grid);
  },[])

  function checkMovement(movement:string){
    let x = player.x;
    let y = player.y
    let newPlayer = new Player(x,y);
    switch (movement) {
      case "l":
        if(board.grid[x][y].left===false)
          newPlayer.y--;
        break;
      case "r":
        if(board.grid[x][y].right===false)
        newPlayer.y++;
        break;
      case "u":
        if(board.grid[x][y].top===false)
        newPlayer.x--;
        break;
      case "d":
        if(board.grid[x][y].bottom===false)
        newPlayer.x++;
        break;
      default:
        break;
    }
    setPlayer(newPlayer);
  }

  return (
    <>
    <div>Board:</div>
    <div className='board'>
      {board.grid.map(row=>{
        return <div className='row'>
          {row.map(cell=>{
            let w = board.width;
            let h = board.height;
            let dimensions = Math.min(40, Math.floor(500/((w+h)/2)));
            let isPlayerInCell = player.x===h-1 && player.y===w-1 ? 'win' as 'win':player.x===cell.x&&player.y===cell.y;
            return <Cell key={`r${cell.x}c${cell.y}`} player={isPlayerInCell} dim={dimensions} left={cell.left} right={cell.right} top={cell.top} bottom={cell.bottom}/>
        })}
        </div> 
      })}
    </div>
    <button onClick={()=>checkMovement('u')}>up</button>
    <button onClick={()=>checkMovement('d')}>down</button>
    <button onClick={()=>checkMovement('r')}>right</button>
    <button onClick={()=>checkMovement('l')}>left</button>
    </>
  )
}

export default App
