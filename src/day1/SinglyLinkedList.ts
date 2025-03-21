type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head || !this.tail) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("index out of range");
        }
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }
        const curr = this.getAt(idx - 1);
        if (!curr) {
            throw new Error("index out of range");
        }
        const node = { value: item } as Node<T>;
        node.next = curr.next;
        curr.next = node;
        this.length++;
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail || !this.head) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        if (!this.head || !this.tail) return undefined;
        if (item === this.head.value) {
            return this.removeHead();
        }
        let curr = this.head;
        while (curr.next) {
            if (curr.next.value === item) {
                return this.removeNextNode(curr);
            }
            curr = curr.next;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length || !this.head) {
            return undefined;
        }
        if (idx === 0) {
            return this.removeHead();
        }
        const prev = this.getAt(idx - 1);
        if (!prev) {
            throw new Error("index out of range");
        }
        return this.removeNextNode(prev);
    }
    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        return curr;
    }
    private removeNextNode(node: Node<T>): T | undefined {
        if (!node.next) {
            return undefined;
        }
        if (this.tail === node.next) {
            this.tail = node;
            this.tail.next = undefined;
        }
        this.length--;
        const value = node.next.value;
        node.next = node.next.next;

        return value;
    }
    private removeHead(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        this.length--;
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }
}
