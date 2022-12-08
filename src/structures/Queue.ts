export class Queue<T> {

    private elements : T[];
    private amount : number;

    constructor() {
        this.elements = [];
        this.amount = 0;
    }

    enqueue(elemento : T) : void {
        this.amount++;
        this.elements.push(elemento);
    }
    
    dequeue() : T {
        if(!this.isEmpty()) {
            this.amount--;
            return <T>this.elements.shift();
        }
        throw new Error("Queue is empty");
    }

    front() : T {
        if (!this.isEmpty()) {
            return this.elements[0];
        }
        throw new Error("Queue is empty");
    }

    back() : T {
        if (!this.isEmpty()) {
            return this.elements[this.size()-1];
        }
        throw new Error("Queue is empty");
    }

    size() : number {
        return this.amount;
    }

    isEmpty() : boolean {
        return this.size() === 0;
    }

    toArray() : Array<T> {
        return this.elements;
    }
}