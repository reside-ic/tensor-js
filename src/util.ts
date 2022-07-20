export function prod(x: number[]) {
    return x.reduce((a: number, b: number) => a * b, 1);
}

export function seq(n: number) {
    return Array(n).fill(1).map((_, i) => i);
}
