type Node = {
    value: string;
    isWord: boolean;
    children: Map<string, Node>;
};

export default class Trie {
    private node: Node;

    constructor() {
        this.node = {
            value: "",
            isWord: false,
            children: new Map<string, Node>(),
        };
    }

    insert(item: string): void {
        if (item.length === 0) return;
        this.append(item, this.node);
    }
    delete(item: string): void {
        if (item.length === 0) return;
        const parent = this.getLastNode(item.slice(0, -1), this.node);
        if (!parent) return;
        const last = item[item.length - 1];
        const node = parent.children.get(last);
        if (!node) return;
        if (node.children.size === 0) {
            parent.children.delete(last);
            return;
        }
        node.isWord = false;
    }
    find(partial: string): string[] {
        if (partial.length === 0) return [];
        const lastNode = this.getLastNode(partial, this.node);

        if (!lastNode) return [];

        return this.getWords(lastNode, partial.slice(0, -1));
    }
    private getWords(node: Node, prefix: string = ""): string[] {
        const words: string[] = [];
        const newPrefix = prefix + node.value;
        if (node.isWord) {
            words.push(newPrefix);
        }
        for (const child of node.children.values()) {
            words.push(...this.getWords(child, newPrefix));
        }
        return words;
    }

    private getLastNode(item: string, needle: Node): Node | undefined {
        if (item.length === 0) return needle;
        const value = item[0];
        const node = needle.children.get(value);
        if (!node) return undefined;
        return this.getLastNode(item.slice(1), node);
    }

    private append(item: string, needle: Node): void {
        if (item.length === 0) return;

        const value = item[0];
        const node = needle.children.get(value);
        if (!node) {
            needle.children.set(value, this.add(item));
            return;
        }
        if (item.length === 1) {
            node.isWord = true;
            return;
        }
        this.append(item.slice(1), node);
    }

    private add(item: string): Node {
        const value = item[0];
        const nextItem = item.slice(1);
        const isWord = nextItem.length === 0;
        const children = new Map<string, Node>();
        if (!isWord) {
            children.set(nextItem[0], this.add(nextItem));
        }

        return {
            value: value,
            isWord: isWord,
            children: children,
        };
    }
}
