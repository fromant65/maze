import Board from "./Board";

class Entity{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    moveDown(board:Board){
        if(board.getCell(this.x,this.y)?.bottom===false){
            this.y+=1;
        }
    }
    moveLeft(board:Board){
        if(board.getCell(this.x,this.y)?.left===false){
            this.x-=1;
        }
    }
    moveTop(board:Board){
        if(board.getCell(this.x,this.y)?.top===false){
            this.y-=1;
        }
    }
    moveRight(board:Board){
        if(board.getCell(this.x,this.y)?.bottom===false){
            this.x+=1;
        }
    }
}

export class Player extends Entity{
    life=3;
}