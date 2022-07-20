import {Tensor} from "./tensor";
// import {VectorView} from "./vector-view";

export class Matrix<T> extends Tensor<T> {
    private readonly nr: number;
    private readonly nc: number;
    constructor(data: T[], nr: number, nc: number) {
        super(data, [nr, nc]);
        this.nr = nr;
        this.nc = nc;
    }

    public get(i: number, j: number) {
        return this.data[i + j * this.nr];
    }

    public getSafely(i: number, j: number) {
        this.checkIndex(i, j);
        return this.get(i, j);
    }

    public set(value: T, i: number, j: number) {
        this.data[i + j * this.nr] = value;
    }

    public setSafely(value: T, i: number, j: number) {
        this.checkIndex(i, j);
        this.data[i + j * this.nr] = value;
    }
    
    public toArray(mode: boolean): T[][] {
        const ret = [];
        if (mode) {
            for (let i = 0, j = 0; i < this.nr; ++i, j += this.nc) {
                ret.push(this.data.slice(j, j + this.nc));
            }
        } else {
            for (let i = 0, j = 0; i < this.nc; ++i, j += this.nr) {
                ret.push(this.data.slice(j, j + this.nr));
            }
        }
        return ret;
    }

    public copyData(): T[] {
        return this.data.slice();
    }

    private checkIndex(i: number, j: number) {
        if (i >= this.nr || j >= this.nc) {
            throw Error("Out of bounds");
        }        
    }

    // public col(j: number) {
    //     const offset = j * this.nr;
    //     const stride = 1;
    //     return new VectorView<T>(this.data, offset, stride);
    // }

    // public row(i: number) {
    //     const offset = i;
    //     const stride = this.nr;
    //     return new VectorView<T>(this.data, offset, stride);
    // }
}
