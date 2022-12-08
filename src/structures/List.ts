export interface List<T> {
    insert(pos : number, el: T) : boolean;
    remove(pos : number) : T;
    element(pos : number) : T;
    size() : number;
    isEmpty() : boolean;
    toArray() : Array<T>;
}