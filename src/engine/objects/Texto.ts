export class Texto {
    x : number;
    y : number;
    color : string;
    text : string;
    size : number;

    constructor(x : number, y : number, size : number = 18) {
        this.x = x;
        this.y = y;
        this.color = 'black';
        this.text = '';
        this.size = size; 
    }

    setText( texto : string) {
        this.text = texto;
    }

    setColor(color : string ) {
        this.color = color;
    }

    draw (context : CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = this.size + "px Consolas";
        context.fillText(this.text, this.x, this.y);
    }
}