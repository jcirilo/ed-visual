export class Retangulo {
    x : number;
    y : number;
    h : number;
    w : number;
    color : string;
    text : string;
    borderColor : string;

    constructor(x : number, y : number, w : number, h : number, cor: string = 'white') {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.color = cor;
        this.text = '';
        this.borderColor = 'black';
    }

    setText( texto : string) {
        this.text = texto;
    }

    setColor(color : string ) {
        this.color = color;
    }

    setBorderColor(color : string) {
        this.borderColor = color;
    }

    private drawStroke(context : CanvasRenderingContext2D) {
        context.strokeStyle = this.borderColor;
        context.strokeRect(this.x, this.y, this.w, this.h);
    }

    draw (context : CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "18px Consolas";
        context.fillText(this.text, this.x+(this.w/2), this.y+(this.h/2));
        this.drawStroke(context);
    }
}