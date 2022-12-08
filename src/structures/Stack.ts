export class Stack<T> {
    private elements : T[];
    private amount : number;
    constructor() {
        this.amount = 0;
        this.elements = [];
    }

    push(el : T) : void {
        this.amount++;
        this.elements.push(el);
    }   
    
    pop() : T {
        if (!this.isEmpty()) {
            this.amount--;
            return <T>this.elements.pop();
        }
        throw new Error("Stack is empty");
    }

    peek() : T {
        if (!this.isEmpty()) {
            return this.elements[this.size()-1];
        }
        throw new Error("Stack is empty");
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