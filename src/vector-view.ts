import {Tensor} from "./tensor";

export class VectorView<T> {
    public readonly data: T[];
    private readonly _length;
    private readonly _offset;
    private readonly _stride;

    constructor(data: T[], offset: number, stride: number) {
        this.data = data;
        this._length = data.length / stride;
        this._offset = offset;
        this._stride = stride;
    }

    public get(i: number) {
        return this.data[this._offset + this._stride * i];
    }

    public set(value: T, i: number) {
        this.data[this._offset + this._stride * i] = value;
    }

    public fill(value: T) {
        for (let i = this._offset; i < this._length; i += this._offset) {
            this.data[i] = value;
        }
    }

    public length() {
        return this._length;
    }

    public dim() {
        return [this._length];
    }

    public toArray() {
        const ret = new Array(this._length);
        for (let i = 0, j = this._offset; i < this._length; ++i, j += this._stride) {
            ret[i] = this.data[j];
        }
        return ret;
    }
}
