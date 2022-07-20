import {prod} from "./util";

// This is our base "dense" tensor. The data may be "owned" by the
// tensor or not
export class Tensor<T> {
    public readonly data: T[];
    public readonly dim: readonly number[];
    public readonly rank: number;
    public readonly offset: number;
    public readonly stride: number[];
    private readonly _length: number;

    protected index(i: number[]) {
        if (i.length !== this.dim.length) {
            throw Error("Incorrect dimension");
        }
        let ret = this.offset;
        for (let j = 0; j < this.rank; ++j) {
            ret += i[j] * this.stride[j];
        }
        return ret;
    }

    constructor(data: T[], dim: number[], stride?: number[], offset?: number) {
        this.dim = dim;
        this.rank = dim.length;
        this.offset = offset ? offset : 0;
        if (stride) {
            this.stride = stride;
        } else {
            this.stride = dim.slice();
            this.stride[0] = 1;
            for (let i = 1; i < this.rank; ++i) {
                this.stride[i] = this.stride[i - 1] * this.dim[i - 1];
            }
        }
        this._length = prod(dim);
        if (data.length !== this._length) {
            throw Error("Incorrect length data");
        }
        this.data = data; // Note: does not copy
    }

    public length() {
        return this._length;
    }

    public fill(value: T) {
        this.data.fill(value);
    }

    public get(...i: number[]) {
        return this.data[this.index(i)];
    }

    public set(value: T, ...i: number[]) {
        this.data[this.index(i)] = value;
    }

    public every(f: (x: T) => boolean) {
        return this.data.some(f);
    }

    public some(f: (x: T) => boolean) {
        return this.data.some(f);
    }

    public includes(el: T) {
        return this.data.includes(el);
    }
}

// In 1d we can implement find, findIndex, indexOf, sort, and reverse
// it's possible the reduce makes sense (apply)
//
// map and forEach need doing but need to work out return types properly
