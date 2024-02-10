import Board from "./Board";
import { Player } from "./Entities";

export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
  }

  drawBoard(board: Board, player: Player) {
    if (this.ctx != null) {
      const blockSize = Math.floor(this.canvas.width / board.width);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid(blockSize, board);
      this.drawPlayer(blockSize, player, board);
    }
  }

  drawGrid(blockSize: number, board: Board) {
    if (this.ctx) {
      this.ctx.strokeStyle = "black";
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
            this.drawLine(topLeft, bottomLeft);
          }
          if (cell.top) {
            this.drawLine(topLeft, topRight);
          }
          if (cell.right) {
            this.drawLine(topRight, bottomRight);
          }
          if (cell.bottom) {
            this.drawLine(bottomLeft, bottomRight);
          }
        });
      });
    }
  }

  drawPlayer(blockSize: number, player: Player, board: Board) {
    if (this.ctx) {
      const playerBlockSize = blockSize * 0.8;
      const playerX = player.x * blockSize + (blockSize - playerBlockSize) / 2;
      const playerY = player.y * blockSize + (blockSize - playerBlockSize) / 2;
      if (player.x === board.height - 1 && player.y === board.width - 1)
        this.ctx.fillStyle = "#0f0"; // green if won
      else {
        this.ctx.fillStyle = "#ff0"; // yellow if playing
      }
      this.ctx.fillRect(playerX, playerY, playerBlockSize, playerBlockSize);
    }
  }

  drawLine(start: [number, number], end: [number, number]) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(start[0], start[1]);
      this.ctx.lineTo(end[0], end[1]);
      this.ctx.stroke();
    }
  }
}
