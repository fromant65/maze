import Board from "./Board";

class Entity{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    moveDown(board:Board){
        let isWon = this.x==board.height-1 && this.y==board.width-1;
        if(board.getCell(this.y,this.x)?.bottom===false && !isWon){
            this.y+=1;
        }
    }
    moveLeft(board:Board){
        if(board.getCell(this.y,this.x)?.left===false){
            this.x-=1;
        }
    }
    moveTop(board:Board){
        let isBeginning = this.x==0 && this.y==0;
        if(board.getCell(this.y,this.x)?.top===false && !isBeginning){
            this.y-=1;
        }
    }
    moveRight(board:Board){
        if(board.getCell(this.y,this.x)?.right===false){
            this.x+=1;
        }
    }
    move(board:Board, movement:string){
        switch (movement) {
            case "l":
              this.moveLeft(board);
              break;
            case "r":
              this.moveRight(board);
              break;
            case "u":
              this.moveTop(board);
              break;
            case "d":
              this.moveDown(board)
              break;
            default:
              break;
          }
    }
}

export class Player extends Entity{
    life=3;
}