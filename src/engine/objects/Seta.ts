export class Seta {
    from_x : number;
    from_y : number;
    to_x : number; 
    to_y : number

    constructor(from_x:number, from_y:number, to_x:number, to_y:number) {
        this.from_x = from_x;
        this.from_y = from_y;
        this.to_x = to_x;
        this.to_y = to_y;
    }

    draw(context : CanvasRenderingContext2D) {
        context.beginPath();
        var headlen = 10;
        var dx = this.to_x - this.from_x;
        var dy = this.to_y - this.from_y;
        var angle = Math.atan2(dy, dx);
        context.moveTo(this.from_x, this.from_y);
        context.lineTo(this.to_x, this.to_y);
        context.lineTo(this.to_x - headlen * Math.cos(angle - Math.PI / 6), this.to_y - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(this.to_x, this.to_y);
        context.lineTo(this.to_x - headlen * Math.cos(angle + Math.PI / 6), this.to_y - headlen * Math.sin(angle + Math.PI / 6));
        context.strokeStyle = "black";
        context.stroke();
    }
}