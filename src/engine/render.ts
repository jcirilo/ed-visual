import { Retangulo } from "./objects/Retangulo";
import { Seta } from "./objects/Seta";
import { Texto } from "./objects/Texto";

function render (estruturaComoArray : Array<any>, tipoDeEstrutura : string) : void {

    const canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("render");
    const context : CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');

    clear(canvas, context);
    setup(canvas);

    switch (tipoDeEstrutura) {
        case 'LSEQ':
            renderListaSEQ(estruturaComoArray, canvas, context);
            break;
        case 'LSENC':
            renderListaENC(estruturaComoArray, canvas, context);
            break;
        case 'FILA':
            renderFila(estruturaComoArray, canvas, context);
            break;
        case 'PILHA':
            renderPilha(estruturaComoArray, canvas, context);
            break;
        default:
            break;
    }

    function clear(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function setup(canvas : HTMLCanvasElement) {
        canvas.width = window.innerWidth - 480;
        canvas.height = window.innerHeight;
    }
}

function renderFila ( filaComoArray : Array<any>, canvas : HTMLCanvasElement, context : CanvasRenderingContext2D ) {

    let w = 64;
    let h = 64;
    let x = 32;
    let y = (canvas.height/2)-(h/2);

    for (let i in filaComoArray) {
        let bloco = new Retangulo(x, y, w, h);
        bloco.setBorderColor('#bbbbbb');
        if (filaComoArray.length === 1) {
            bloco.setBorderColor('orange');
            let posInfoTXT = new Texto(bloco.x + (bloco.w/2), y-18/2, 18);
            posInfoTXT.setText('início / fim');
            posInfoTXT.draw(context);
        }
        if (filaComoArray.length > 1 ) {
            if (parseInt(i) === 0) {
                bloco.setBorderColor('red');
                let posInfoTXT = new Texto(bloco.x + (bloco.w/2), y-18/2, 18);
                posInfoTXT.setText('início');
                posInfoTXT.draw(context);
            } else if (parseInt(i) === filaComoArray.length-1) {
                bloco.setBorderColor('blue');
                let posInfoTXT = new Texto(bloco.x + (bloco.w/2), y-18/2, 18);
                posInfoTXT.setText('fim');
                posInfoTXT.draw(context);
            }
        }
        bloco.setText(filaComoArray[parseInt(i)]);
        bloco.draw(context);
        x += w+4;
    }
}

function renderListaENC(listaComoArray: Array<any>, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    let w = 64;
    let h = 64;
    let x = 32;
    let y = (canvas.height/2)-(h/2);

    let blocoCabeca = new Retangulo(x, y-h*2, w, h);
    blocoCabeca.setText('cabeça');
    blocoCabeca.setBorderColor('red');
    let textoValorCabeca = new Texto(
        blocoCabeca.x+blocoCabeca.w/2, 
        blocoCabeca.y+blocoCabeca.h/2+20,
        18);
    if (listaComoArray.length > 0) {
        let seta = new Seta(blocoCabeca.x+(blocoCabeca.w/2), blocoCabeca.y+(blocoCabeca.h/2), blocoCabeca.x+(blocoCabeca.w/2), (blocoCabeca.y+((blocoCabeca.h*2)-(h/4))-18));
        seta.draw(context);
    }
    if (listaComoArray.length === 0) {
        textoValorCabeca.setText('(null)')
    }
    blocoCabeca.draw(context);
    textoValorCabeca.draw(context);
    for (let i = 0; i < listaComoArray.length; i++) {
        let bloco = new Retangulo(x, y, w, h);
        let seta = new Seta(bloco.x + (bloco.w/2), bloco.y + (bloco.h/2), bloco.x + (w*1.4), bloco.y + (bloco.h/2));
        let posicaotxt = new Texto(bloco.x + (bloco.w/2), y-18/2, 18);
        posicaotxt.setText((i+1).toString());
        if (!(i === listaComoArray.length-1)) {
            seta.draw(context);
        }

        if (i === 0) {
            textoValorCabeca.setText('(' + listaComoArray[0] + ')');
            textoValorCabeca.draw(context);
        }

        bloco.setText(listaComoArray[i]);
        bloco.draw(context);
        posicaotxt.draw(context);
        x += w+32;
    }

}

function renderListaSEQ(listaComoArray: Array<any>, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    let w = 64;
    let h = 64;
    let x = 32;
    let y = (canvas.height/2)-(h/2);
    let i = 1;
    for (let elemento of listaComoArray) {
        let bloco = new Retangulo(x, y, w, h);
        let posicaotxt = new Texto(bloco.x + (bloco.w/2), y-18/2, 18);
        posicaotxt.setText((i).toString());

        bloco.setText(elemento);
        bloco.draw(context);
        posicaotxt.draw(context);
        x += w;
        i++;
    }
}

function renderPilha(pilhaComoArray: Array<any>, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    let w = 64;
    let h = 32;
    let x = (canvas.width/2)-(w/2);
    let y = (canvas.height)-(h);

    for (let elemento of pilhaComoArray) {
        let bloco = new Retangulo(x, y, w, h);
        bloco.setText(elemento);
        bloco.draw(context);
        y -= h;
    }
}

export default render;