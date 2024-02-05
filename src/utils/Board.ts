import Cell from "./Cell";
import RNG from "./RNG";

export default class Board {
  grid: Cell[][];
  width: number;
  height: number;
  seed: number;
  constructor(seed: number, height: number, width: number) {
    this.width = width;
    this.height = height;
    this.seed = seed;
    this.grid = this.generateEmptyGrid();
  }
  generateEmptyGrid() {
    let grid: Cell[][] = [];
    for (let i = 0; i < this.height; i++) {
      grid.push([]);
      for (let j = 0; j < this.width; j++) {
        grid[i].push(new Cell(i, j));
      }
    }
    return grid;
  }
  populateMaze() {
    let generator = new BoardGenerator(this.seed);
    generator.generateBySeed(this.grid[0][0], this);
    console.log("Finished populating maze: ");
    console.log(this);
  }
  getCell(x: number, y: number) {
    if (x < 0 || x >= this.height || y < 0 || y >= this.width) return null;
    return this.grid[x][y];
  }
  getNeighborCells(cell: Cell) {
    let x = cell.x;
    let y = cell.y;
    let neighbors = new Neighbors(this, x, y);
    return neighbors;
  }
}

class BoardGenerator {
  seed: number;
  stack: Cell[] = [];
  visitedCells: Set<Cell> = new Set();
  constructor(seed: number) {
    this.seed = seed;
  }
  generateBySeed(initial_cell: Cell, board: Board) {
    let rng = new RNG(this.seed);
    this.stack.push(initial_cell);
    this.visitedCells.add(initial_cell);
    while (this.stack.length > 0) {
      let currentCell = this.stack.pop();
      if (currentCell) {
        let neighbors = new Neighbors(board, currentCell.x, currentCell.y);

        let availableNeighbors: Cell[] = [];
        neighbors.left != null &&
          !this.visitedCells.has(neighbors.left) &&
          availableNeighbors.push(neighbors.left);
        neighbors.right != null &&
          !this.visitedCells.has(neighbors.right) &&
          availableNeighbors.push(neighbors.right);
        neighbors.top != null &&
          !this.visitedCells.has(neighbors.top) &&
          availableNeighbors.push(neighbors.top);
        neighbors.bottom != null &&
          !this.visitedCells.has(neighbors.bottom) &&
          availableNeighbors.push(neighbors.bottom);

        if (availableNeighbors.length > 0) {
          this.stack.push(currentCell);
          let neighbor = rng.choice(availableNeighbors);
          let orientation = this.getOrientation(currentCell, neighbor);
          this.removeWalls(board, currentCell, orientation);
          this.stack.push(neighbor);
          this.visitedCells.add(neighbor);
        }
      }
    }
  }

  getOrientation(cell1: Cell, cell2: Cell) {
    if (cell1.x > cell2.x) return "t"; //cell2 is to the top of cell1
    else if (cell1.x < cell2.x) return "b"; //cell2 is to the bottom of cell1
    else if (cell1.y > cell2.y) return "l"; //cell2 is to the left of cell1
    else if (cell1.y < cell2.y) return "r"; //cell2 is to the right of cell1
    else return "s"; //The 2 cells are the same
  }

  removeWalls(board: Board, cell: Cell, orientation: string) {
    let x = cell.x;
    let y = cell.y;
    switch (orientation) {
      case "l":
        board.grid[x][y].left = false;
        board.grid[x][y-1].right = false;
        //console.log(board.grid[x][y], board.grid[x][y-1], orientation);
        break;
      case "r":
        board.grid[x][y].right = false;
        board.grid[x][y+1].left = false;
        //console.log(board.grid[x][y], board.grid[x][y+1], orientation);
        break;
      case "t":
        board.grid[x][y].top = false;
        board.grid[x-1][y].bottom = false;
        //console.log(board.grid[x][y], board.grid[x-1][y], orientation);
        break;
      case "b":
        board.grid[x][y].bottom = false;
        board.grid[x+1][y].top = false;
        //console.log(board.grid[x][y], board.grid[x+1][y], orientation);
        break;
      default:
        console.log(`The given orientation is not valid: ${orientation}`);
        break;
    }
  }
}

class Neighbors {
  bottom: Cell | null;
  top: Cell | null;
  left: Cell | null;
  right: Cell | null;
  constructor(board: Board, x: number, y: number) {
    this.bottom = this.getBottom(board, x, y);
    this.top = this.getTop(board, x, y);
    this.left = this.getLeft(board, x, y);
    this.right = this.getRight(board, x, y);
  }
  getBottom(board: Board, x: number, y: number) {
    return board.getCell(x+1, y);
  }
  getTop(board: Board, x: number, y: number) {
    return board.getCell(x-1, y);
  }
  getRight(board: Board, x: number, y: number) {
    return board.getCell(x , y+1);
  }
  getLeft(board: Board, x: number, y: number) {
    return board.getCell(x, y-1);
  }
}
