class Node<T> {
    content : T | null;
    left : Node<T> | null;
    right : Node<T> | null;
    constructor () {
        this.left = null;
        this.right = null;
        this.content = null;
    }

    getValue() : T {
        return <T>this.content;
    }
    
    getLeft() : Node<T> {
        return <Node<T>>this.left;
    }
    
    getRight () : Node<T> {
        return <Node<T>>this.right;
    }

    setValue(content : T) {
        this.content = content;
    }

    setLeft(node : Node<T>) {
        this.left = node;
    }
    setRight(node : Node<T>) {
        this.right = node;
    }

}

export class AVL<E> {

    root : Node<E> | null ;

    constructor () {
        this.root = null;
    }

    isEmpty() : boolean {
        return this.root === null;
    }

    private recursiveSearch(node : Node<E>, value : E) : Node<E> | null {
        if (node === null) {
            return null;
        }
        if (node.getValue() === value) {
            return node;
        }
        if (value < node.getValue()) {
            return this.recursiveSearch(node.getLeft(), value);
        }
        return this.recursiveSearch(node.getRight(), value);
    }

    search(value : E) : Node<E> {
        return <Node<E>>this.recursiveSearch(<Node<E>>this.root, value);
    }
    
    private showAux(node : Node<E>) {
        if (node !== null) {
            this.showAux(<Node<E>>node.getLeft())
        }
    }

    show() {
        if (this.root === null) {
            return '[]';
        } else {
            this.showAux(<Node<E>>this.root);
        }
    }

    private exibeDecAux(node : Node<E>) {
        if (node !== null) {
            this.exibeDecAux(node.getRight());
            this.exibeDecAux(node.getLeft());
        }
    }

    exibeDec() {
        if (this.root === null) {
        } else {
            this.exibeDecAux(this.root);
        }
    }

    insert(value : E) : boolean {
        let newNode = new Node();
        newNode.setValue(value);

        if (this.root === null) {
            this.root = <Node<E>>newNode;
            return true;
        }

        let auxNode = this.root;
        let p = null;
        while (auxNode !== null) {
            p = auxNode;
            if (value < auxNode.getValue()) {
                auxNode = auxNode.getLeft();
            } else {
                auxNode = auxNode.getRight();
            }
        }

        if (value < <E>p?.getValue()) {
            p?.setLeft(<Node<E>>newNode);
        } else {
            p?.setRight(<Node<E>>newNode);
        }
        return true;
    }

}