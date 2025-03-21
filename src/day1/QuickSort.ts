export default function quick_sort(arr: number[]): void {
    sort(arr, 0, arr.length - 1);
}

function partition(arr: number[], low: number, height: number): number {
    const pivot = arr[height];
    let id = low - 1;
    for (let i = low; i < height; i++) {
        if (arr[i] < pivot) {
            id++;
            const tmp = arr[id];
            arr[id] = arr[i];
            arr[i] = tmp;
        }
    }
    id++;
    arr[height] = arr[id];
    arr[id] = pivot;
    return id;
}

function sort(arr: number[], low: number, height: number): void {
    if (low >= height) return;
    const pivot = partition(arr, low, height);
    sort(arr, low, pivot - 1);
    sort(arr, pivot + 1, height);
}
