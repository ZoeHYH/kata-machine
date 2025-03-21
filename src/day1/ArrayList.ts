type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class ArrayList<T> {
    public length: number;
    private head?: Node<T>;

    constructor(capacity: number) {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("index out of range");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }
        const curr = this.getAt(idx);
        if (!curr) {
            throw new Error("index out of range");
        }
        const node = { value: item } as Node<T>;
        node.next = curr;
        curr.next = node;

        this.length++;
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = node;
    }
    remove(item: T): T | undefined {
        if (!this.head) return undefined;
        if (this.head.value === item) {
            this.length--;
            const value = this.head.value;
            this.head = this.head.next;
            return value;
        }
        let curr = this.head;
        while (curr.next) {
            if (curr.next.value === item) {
                this.length--;
                const value = curr.next.value;
                curr.next = curr.next.next;
                return value;
            }
            curr = curr.next;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        if (idx === 0) {
            this.length--;
            const value = this.head?.value;
            this.head = this.head?.next;
            return value;
        }
        const prev = this.getAt(idx - 1);
        if (!prev) {
            return undefined;
        }
        this.length--;
        const value = prev.next?.value;
        prev.next = prev.next?.next;
        return value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        return curr;
    }
}
