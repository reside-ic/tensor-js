import {TensorBase} from "./tensor";
import {VectorView} from "./vector-view";

export class Matrix<T> extends TensorBase<T> {
    constructor(data: T | T[], nr: number, nc: number) {
        super(data, [nr, nc]);
    }

    public get(i: number, j: number) {
        return this.data[i + j * this.dim[0]];
    }

    public set(value: T, i: number, j: number) {
        this.data[i + j * this.dim[0]] = value;
    }

    public col(j: number) {
        const offset = j * this.dim[0];
        const stride = 1;
        return new VectorView<T>(this.data, offset, stride);
    }

    public row(i: number) {
        const offset = i;
        const stride = this.dim[0];
        return new VectorView<T>(this.data, offset, stride);
    }
}
