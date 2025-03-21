export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;
    while (!breaks[i] && i < breaks.length) {
        i += jump;
    }
    i -= jump - 1;

    while (!breaks[i]) {
        if (i === breaks.length - 1) return -1;
        i++;
    }

    return i;
}
