import { List } from "./List";

class Node<E> {
    private next : Node<E> | null ;
    private value : E | null;

    constructor() {
        this.next = null;
        this.value = null;
    }

    hasNext() : boolean {
        return this.next !== null;
    }

    getNext() : Node<E> | null {
        return this.next;
    }

    setNext(node : Node<E>) : boolean {
        this.next = node;
        return true;
    }

    getValue() : E | null {
        return this.value;
    }

    setValue(value : E) : boolean {
        this.value = value;
        return true;
    }
}

export class LinkedList<T> implements List<T> {
    private head : Node<T> | null;
    private amount : number;

    constructor() {
        this.head = null;
        this.amount = 0;
    }
    
    private insertFirst(value: T) : boolean {
        let newNode = new Node<T>();
        newNode.setValue(value);
        newNode.setNext(<Node<T>>this.head);
        this.head = newNode;
        this.amount++;
        return true;
    }

    private insertMiddle(pos:number, value:T) : boolean {
        let newNode = new Node<T>();
        newNode.setValue(value);
        let auxNode = this.head;
        for (let i = 1; i < pos - 1; i++) {
            auxNode = <Node<T>>auxNode?.getNext();
        }
        newNode.setNext(<Node<T>>auxNode?.getNext());
        auxNode?.setNext(newNode);
        this.amount++;
        return true;
    }

    insert(pos: number, value: T): boolean {
        if (this.isEmpty() && pos !== 1) {
            return false;
        }
        if (pos < 1 || pos > this.size()+1) {
            return false;
        }
        if (pos === 1) {
            return this.insertFirst(value);
        } else {
            return this.insertMiddle(pos, value);
        }
    }

    private removeFirst() : T {
        let killNode = this.head;
        let trash = <T>killNode?.getValue();
        this.head = <Node<T>>killNode?.getNext();
        this.amount--;
        killNode = null;
        return trash;
    }

    private removeMiddle(pos : number) : T {
        let thisNode = null;
        let previousNode = null;
        let trash = null;
        let count = 1;
        thisNode = this.head;
        while ((count < pos) && (thisNode != null)) {
            previousNode = thisNode;
            thisNode = thisNode.getNext();
            count++;
        }
        if (thisNode === null) {
            throw new Error("Out of range");
        }
        trash = thisNode.getValue();
        previousNode?.setNext(<Node<T>>thisNode.getNext());
        this.amount--;
        thisNode = null;
        return <T>trash;
    }

    remove(pos: number): T {
        if (this.isEmpty() || pos < 1 || pos > this.size()) {
            throw new Error("Out of range");
        }

        if (pos === 1) {
            return this.removeFirst();
        }
        return this.removeMiddle(pos);
    }

    getFirst() : T {
        if (!this.isEmpty()) {
            return <T>this.head?.getValue();
        }
        throw new Error('Is empty');
    }

    element(pos: number): T {
        let auxNode = this.head;
        let count = 1;
        if (this.isEmpty() || pos < 1 || pos > this.size()) {
            throw new Error("Out of range");
        }
        while (count < pos) {
            auxNode = <Node<T>>auxNode?.getNext();
            count++;
        }
        return <T>auxNode?.getValue();
    }

    size(): number {
        return this.amount;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    toArray(): T[] {
        let aux = this.head;
        let out : T[] = [];
        while(aux != null) {
            if (out.length === 0) {
                out.push(<T>this.head?.getValue());
            } else {
                out.push(<T>aux.getValue());
            }
            aux = aux.getNext();
        }
        return out;
    }
}