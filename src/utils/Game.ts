import Board from "./Board";
import { Player } from "./Entities";
import RNG from "./RNG";

export default class Game{
    level:number;
    timer:number;
    timerIncrement:number = 6;
    seed: number;
    constructor(level:number|undefined, timer:number|undefined, seed:number|undefined){
        this.level = level&&level>0 ? level : 1;
        this.timer = timer&&timer>0 ? timer : 10;
        this.seed = seed!=undefined ? seed: Math.floor(Math.random()*Math.pow(2,31));
    }
    startGame(){
        let [h, w] = [this.level*2 + 5, this.level*2+5];
        let newBoard = new Board(this.seed, h, w);
        newBoard.populateMaze();
        newBoard.grid[0][0].top = false;
        newBoard.grid[w - 1][h - 1].bottom = false;
        return newBoard;
    }
    nextLevel(board:Board, player:Player){
        if(player.x === board.height-1 && player.y === board.width-1 ){
            let rng = new RNG(this.seed);
            this.seed = rng.nextInt();
            this.level++;
            this.timer+=this.timerIncrement+ this.level*2.5;
            return this.startGame();
        }
        else return board;
    }
}