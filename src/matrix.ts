import {Tensor} from "./tensor";
// import {VectorView} from "./vector-view";

export class Matrix<T> extends Tensor<T> {
    private readonly nr: number;
    constructor(data: T[], nr: number, nc: number) {
        super(data, [nr, nc]);
        this.nr = nr;
    }

    public get(i: number, j: number) {
        return this.data[i + j * this.nr];
    }

    public set(value: T, i: number, j: number) {
        this.data[i + j * this.nr] = value;
    }

    // public toArray(): T[][] {
    //     const ret = [];
    //     for (let i = 0; i < this.nc; ++i) {
    //     }
    // }

    public copyData(): T[] {
        return this.data.slice();
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
