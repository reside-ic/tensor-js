import {Tensor} from "./tensor";

export class Vector<T> extends Tensor<T> {
    constructor(data: T[]) {
        super(data, [data.length]);
    }

    public get(i: number): T {
        return this.data[i];
    }

    public set(value: T, i: number): void {
        this.data[i] = value;
    }

    public toArray(): T[] {
        return this.data.slice();
    }
}
