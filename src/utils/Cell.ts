export default class Cell{
    x:number;
    y:number;
    left=true;
    top=true;
    right=true;
    bottom=true;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
}

