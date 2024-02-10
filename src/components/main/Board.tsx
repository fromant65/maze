import { useEffect, useRef } from "react";
import Board from "../../utils/Board";
import { Player } from "../../utils/Entities";
import Canvas from "../../utils/Canvas";

interface State {
  board: Board;
  player: Player;
  width:number;
  height:number
}

const BoardComponent = ({ board, player, width, height }: State) => {
  const canvas: HTMLCanvasElement | null = null;
  const canvasRef = useRef(canvas);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas){
      let canvasObj = new Canvas(canvas,width,height);
      canvasObj.drawBoard(board,player);
    };
  }, [board, player]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default BoardComponent;
