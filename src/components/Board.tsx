import { useEffect, useRef } from "react";
import Board from "../utils/Board";
import { Player } from "../utils/Entities";

interface State {
  board: Board;
  player: Player;
}

const BoardComponent = ({ board, player }: State) => {
  const canvas: HTMLCanvasElement | null = null;
  const canvasRef = useRef(canvas);

  function drawGrid(
    blockSize: number,
    ctx: CanvasRenderingContext2D,
    board: Board
  ) {
    ctx.strokeStyle = "black";
    board.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        let topLeft: [number, number] = [
          colIndex * blockSize,
          rowIndex * blockSize,
        ];
        let topRight: [number, number] = [
          (colIndex + 1) * blockSize,
          rowIndex * blockSize,
        ];
        let bottomLeft: [number, number] = [
          colIndex * blockSize,
          (rowIndex + 1) * blockSize,
        ];
        let bottomRight: [number, number] = [
          (colIndex + 1) * blockSize,
          (rowIndex + 1) * blockSize,
        ];
        if (cell.left) {
          drawLine(ctx, topLeft, bottomLeft);
        }
        if (cell.top) {
          drawLine(ctx, topLeft, topRight);
        }
        if (cell.right) {
          drawLine(ctx, topRight, bottomRight);
        }
        if (cell.bottom) {
          drawLine(ctx, bottomLeft, bottomRight);
        }
      });
    });
  }

  function drawPlayer(
    blockSize: number,
    ctx: CanvasRenderingContext2D,
    player: Player
  ) {
    const playerBlockSize = blockSize * 0.8;
    const playerX = player.x * blockSize + (blockSize - playerBlockSize) / 2;
    const playerY = player.y * blockSize + (blockSize - playerBlockSize) / 2;
    if (player.x === board.height - 1 && player.y === board.width - 1)
      ctx.fillStyle = "#0f0"; // green if won
    else {
      ctx.fillStyle = "#ff0"; // yellow if playing
    }
    ctx.fillRect(playerX, playerY, playerBlockSize, playerBlockSize);
  }

  function drawLine(
    ctx: CanvasRenderingContext2D,
    start: [number, number],
    end: [number, number]
  ) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  }

  function drawBoard(canvas: HTMLCanvasElement) {
    const ctx = canvas?.getContext("2d");
    if (ctx != null) {
      const blockSize = Math.floor(canvas.width / board.width);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(blockSize, ctx, board);
      drawPlayer(blockSize, ctx, player);
    }
  }

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) drawBoard(canvas);
  }, [board, player]);

  return <canvas ref={canvasRef} width="500" height="500"></canvas>;
};

export default BoardComponent;
