// export interface Tensor<T> {
//     public readonly data: T[];
//     public dim(): readonly number[];
//     public length(): number;
//     public fill(value: T): void;
// }

function prod(x: number[]) {
    return x.reduce((a: number, b: number) => a * b, 1);
}

type Predicate<T> = (x: T) => boolean;


export abstract class TensorBase<T> {
    public readonly data: T[];
    public readonly dim: readonly number[];
    public readonly length: number;
    public readonly rank: number;
    protected readonly offset: number[];

    protected index(i: number[]) {
        if (i.length !== this.dim.length) {
            throw Error("Incorrect dimension");
        }
        let ret = i[0];
        for (let j = 1; j < this.rank; ++j) {
            ret += i[j] * this.offset[j - 1];
        }
        return ret;
    }

    constructor(data: T | T[], dim: number[]) {
        this.dim = dim;
        this.rank = dim.length;
        this.offset = dim.slice();
        for (let i = 1; i < this.rank; ++i) {
            this.offset[i] *= this.offset[i - 1];
        }
        this.length = this.offset[this.rank - 1];
        // not an ideal check - we really want typeof data === T
        if (Array.isArray(data)) {
            if (data.length !== this.length) {
                throw Error("Incorrect length data");
            }
            this.data = data; // Note: does not copy
        } else {
            this.data = Array(this.length).fill(data);
        }
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

    // public map(f: any): this {
    //     return new this(this.data.map(f), this.dim)
    // }
    
    // map - type it?
    // forEach - probably ok

    public every(f: (x: T) => boolean) {
        return this.data.some(f);
    }

    public some(f: (x: T) => boolean) {
        return this.data.some(f);
    }

    public includes(el: T) {
        return this.data.includes(el);
    }

    // find - possibly weird in >=2d
    // findIndex - possibly weird in >=2d
    // indexOf

    // sort - makes no sense except for 1d structures    
    // reduce - 1d only
    // reverse - 1d only
}
