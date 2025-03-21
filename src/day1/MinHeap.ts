export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data.push(value);
        this.length++;
        this.heapifyUp(this.length - 1);
    }
    delete(): number {
        if (this.length === 0) throw new Error("heap is empty");
        const out = this.data[0];
        this.length--;
        const value = this.data.pop();
        if (!value) throw new Error("heap is empty");
        if (this.length > 0) {
            this.data[0] = value;
            this.heapifyDown(0);
        }

        return out;
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;
        const leftIdx = this.left(idx);
        const rightIdx = this.right(idx);
        if (leftIdx >= this.length) return;
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];
        const minValue = Math.min(leftValue, rightValue, value);
        if (minValue === value) return;
        if (minValue === leftValue) {
            this.data[leftIdx] = value;
            this.data[idx] = leftValue;
            this.heapifyDown(leftIdx);
        } else {
            this.data[rightIdx] = value;
            this.data[idx] = rightValue;
            this.heapifyDown(rightIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return;
        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];
        if (parentValue > value) {
            this.data[parentIdx] = value;
            this.data[idx] = parentValue;
            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private left(idx: number): number {
        return 2 * idx + 1;
    }
    private right(idx: number): number {
        return 2 * idx + 2;
    }
}
