import { List } from "./List";

export class SequentialList<T> implements List<T> {
    private elements : Array<null|T>;
    private amount : number;
    private capacity : number;

    constructor(capacity : number) {
        this.elements = new Array<null|T>(capacity);
        this.capacity = capacity;
        this.amount = 0;
        for (let i = 0; i < capacity; i++) {
            this.elements[i] = null;
        }
    }

    insert(pos: number, el: T): boolean {
        if (pos < 1 || pos > this.size()+1 || this.isFull()) {
            return false;
        }
        for (let i = this.size(); i >= pos; i--) {
            this.elements[i] = this.elements[i-1];
        }
        this.elements[pos-1] = el;
        this.amount++;
        return true;
    }

    getCapacity() : number {
        return this.capacity;
    }

    remove(pos: number): T {
        if (pos < 1 || pos > this.size() || this.isEmpty()) {
            throw new Error("Out of range");
        }
        let trash = this.elements[pos-1];
        for (let i = pos-1 ; i < this.size()-1; i++ ) {
            this.elements[i] = this.elements[i+1];
        }
        this.amount--;
        this.elements[this.size()] = null;
        return <T>trash;
    }
    
    element(pos: number): T {
        if (pos < 1 || pos > this.size() || this.isEmpty()) {
            throw new Error("Out of range");
        }
        return <T>this.elements[pos-1];
    }
    
    size(): number {
        return this.amount
    }

    isEmpty() : boolean {
        return this.size() === 0;
    }

    isFull() : boolean {
        return this.size() === this.capacity; 
    }

    toArray() : Array<T> {
        let out : Array<T> = <Array<T>>this.elements; 
        return out;
    }
}