import { Queue } from "./Queue";

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
    
    getLeft() : Node<T> | null {
        return this.left;
    }
    
    getRight () : Node<T> | null {
        return this.right;
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

export class BinaryTree<E> {
	private root : Node<E> | null;
	private amount : number;
	constructor() {
        this.root = null;
		this.amount = 0;
	}
	
	/** Verifica se a árvore está vazia */
	isEmpty () : boolean {
		return (this.root== null);
	}

	size() : number {
		return this.amount;
	}

	/** Funcao de busca recursiva.
		Retorna o endereço do elemento se ele for encontrado.
		Caso contrario, retorna null*/
	private searchAux(node : Node<E> | null , value: E) : Node<E> | null {          
		// Condicao de parada
		if (node == null) 
			return null;  // Arvore Vazia

		// Condicao de parada
		if(node.getValue() == value) { 
			return node; //Elem. encontrado na raiz
		}
		
		// Caso recursivo
		let aux : Node<E> | null = this.searchAux(node.getLeft(), value);
		if (aux == null)
			aux = this.searchAux(node.getRight(), value);
		return aux;
	}
	
	/** Buscar um elemento na árvore
		Retorna o endereço se o elemento for encontrado, 
		Caso contrário retorna NULL*/
	search(value : E) : Node<E> | null {          
		if (this.isEmpty())
			return null;
		
		//No res = busca(raiz, valor);
		//return res;
		return this.searchAux(this.root, value);
	}
	
	
	/** Insere um nó raiz em uma árvore vazia 
	 	Retorna true se a inserção for com sucesso.
		Caso contrário, retorna false */   
	insertRoot(valor : E) : boolean {   
		if (this.root !== null) 
			return false;  //Erro: Arvore não está vazia

		let newNode = new Node<E>();
		newNode.setValue(valor);
        this.root = newNode;
		return true;
	}   

	/** Insere um filho à direita de um dado nó.
    		Retorna true se a inserção for com sucesso,
    		Caso contrário false  */
	insertRight(vPai : E, vFilho : E ) : boolean {
		
		// Verifica se o elemento já existe
		let filho = this.search(vFilho);
		if (filho != null)
	        return false;  // Err: dado já existe
	
		// Busca o pai e verifica se possui filho direito
		let pai = this.search(vPai);
	  	if (pai == null)
			return false;  // Err: pai não encontrado
		
	  	if (pai.getRight() != null)
			return false;  // Err: filho dir já existe
	
		let newNode = new Node<E>();
		newNode.setValue(vFilho);

		pai.setRight(newNode);

		return true;
	}

	/** Insere um filho à esquerda de um dado nó.
		Retorna true se a inserção for com sucesso,
		Caso contrário false  */
	insertLeft(vPai : E , vFilho : E) : boolean {
		
		// Verifica se o elemento já existe 
		let filho = this.search(vFilho);
		if (filho != null)
	        return false;  // Err: dado já existe
	
		// Busca o pai e verifica se possui filho da esq
		let pai = this.search(vPai);
	  	if (pai == null)
			return false; // Err: pai não encontrado
	  	
		if (pai.getLeft() != null)
			return false; // Err: filho esq já existe
	
		let newNode = new Node<E>();
		newNode.setValue(vFilho);
		
		pai.setLeft(newNode);
		return true;
	}
	
	private postorder(node : Node<E> | null, copyArr : Array<E>) {
        if (node == null)
            return;
        this.postorder(node.getLeft(), copyArr);
        this.postorder(node.getRight(), copyArr); 
        copyArr.push(node.getValue());
    }

	private inorder(node : Node<E> | null, copyArr : Array<E>) {
        if (node == null)
            return;
        this.inorder(node.getLeft(), copyArr);
        copyArr.push(node.getValue()); 
        this.inorder(node.getRight(), copyArr);
    }

	private preorder(node : Node<E> | null, copyArr : Array<E>) {
		if (node == null)
			return;
		copyArr.push(node.getValue());
		this.preorder(node.getLeft(), copyArr);
		this.preorder(node.getRight(), copyArr);
	}

	toPostorder() : Array<E>{
		let copyArr = new Array<E>();
		this.postorder(this.root, copyArr);
		return copyArr;
	}

	toInorder() : Array<E> {
		let copyArr = new Array<E>();
		this.inorder(this.root, copyArr);
		return copyArr;
	}

	toPreorder() : Array<E> {
		let copyArr = new Array<E>();
		this.preorder(this.root, copyArr);
		return copyArr;
	}

	/**
	 * Breadth-first search | Pesquisa em largura
	 * @param value search value 
	 */
	// public BFSearch(value : E) : E | null {
	// 	let queue = new Queue<Node<E> | null>();
	// 	if (this.isEmpty())
	// 		return null; // Err: arv vazia
		
	// 	queue.enqueue(<Node<E>>this.root);
	// 	while(!queue.isEmpty()) {
	// 		let aux = queue.dequeue();
			
	// 		console.log("[ATUAL] = " + aux?.getValue());

	// 		if (aux?.getValue() === value)
	// 			return aux.getValue();
			
	// 		// Adiciona os filhos na fila
	// 		if (aux?.getLeft() !== null)
	// 			queue.enqueue(<Node<E>|null>aux?.getLeft());
			
	// 		if (aux?.getRight() !== null)
	// 			queue.enqueue(<Node<E>|null>aux?.getRight());
	// 	}
		
	// 	console.log("Nao achei... ");
	// 	return null;
	// }
}