import {TensorBase} from "./tensor";

export class Vector<T> extends TensorBase<T> {
    constructor(data: T | T[], length: number) {
        super(data, [length]);
    }
    
    public get(i: number) {
        return this.data[i];
    }

    public set(value: T, i: number) {
        this.data[i] = value;
    }
}
