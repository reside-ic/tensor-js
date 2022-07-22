import { prod } from "./util";

/**
 * Base tensor class. Unlike derived classes, this is not type safe in
 * terms of rank.
 *
 * Some methods, notably {@link get} and {@link set}, take variable
 * numbers of arguments that must match with the rank of the tensor,
 * and TypeSript is not able to validate this at compile time.
 *
 * ```
 * const d = new Tensor(Array(24).fill(0), [2, 3, 4]);
 * d.get(1, 2, 3); // accepted by compiler, run time success
 * d.get(1, 2);    // accepted by compiler, run time error
 * ```
 *
 * For this reason, you probably want to use one of the specialised
 * versions of this class ({@link Vector}, {@link Matrix}, {@link
 * Tensor3}, {@link Tensor4}, ...) which give compile time validation.
 *
 * ## Conversion to "normal" JavaScript types
 *
 * The intention with this package is that it is exposed as little as
 * possible to the rest of JavaScript - pretty soon you'll want to
 * extract some normal low-dimensional data to pass to other
 * JavaScript packages. Because JavaScript does not allow overloading
 * of the `[]` operator it's not at all possible to "pretend" that the
 * tensor objects can be used in place of Arrays.
 *
 * The most basic strategy is to create a {@link VectorView} of a one
 * dimensional slice through the data and run {@link
 * VectorView.toArray} on it.
 */
export class Tensor<T> {
    public readonly data: T[];
    public readonly rank: number;
    public readonly offset: number;
    public readonly stride: number[];
    private readonly _length: number;
    private readonly _dim: readonly number[];

    /**
     * Construct a new tensor
     *
     * @param data Underlying data. Note that this will not be copied.
     *
     * @param dim Array of dimensions
     *
     * @param stride Optional array of stride
     *
     * @param offset Optional offset
     */
    constructor(data: T[], dim: number[], stride?: number[], offset?: number) {
        this._dim = dim;
        this.rank = dim.length;
        this.offset = offset ? offset : 0;
        if (stride) {
            this.stride = stride;
            for (let i = 0; i < stride.length; ++i) {
                if (stride[i] === 0) {
                    if (dim[i] !== 0) {
                        throw Error(`Invalid zero length stride for dimension ${i}`);
                    }
                } else if (stride[i] < 0) {
                    throw Error(`Negative length stride for dimension ${i}`);
                }
            }
        } else {
            this.stride = dim.slice();
            this.stride[0] = 1;
            for (let i = 1; i < this.rank; ++i) {
                this.stride[i] = this.stride[i - 1] * this._dim[i - 1];
            }
        }
        this._length = prod(dim);
        // NOTE: no check here that data is long enough, we should do
        // this, but it's a bit complicated by the dim/stride/offset
        // combo.
        this.data = data; // Note: does not copy
    }

    /**
     * Return total length of the tensor (product of its
     * dimensions). If `stride` or `offset` has been set then this
     * might be smaller than the size of the underlying data
     * (`data.length`).
     */
    public length(): number {
        return this._length;
    }

    /**
     * Return total length of the tensor (product of its
     * dimensions). If `stride` or `offset` has been set then this
     * might be smaller than the size of the underlying data
     * (`data.length`).
     */
    public dim(): readonly number[] {
        return this._dim;
    }

    /**
     * Get a single element from a tensor. It is likely that derived
     * classes provide an optimised version of this method.
     *
     * @param i Arguments representing the indices - there must be as
     * many of these as there are dimensions, and the TypeScript
     * compiler is not able to check this!
     */
    public get(...i: number[]): T {
        return this.data[this.index(i, false)];
    }

    /**
     * Set a single element into a tensor. It is likely that derived
     * classes provide an optimised version of this method.
     *
     * @param value New value to set into the tensor
     *
     * @param i Arguments representing the indices - there must be as
     * many of these as there are dimensions, and the TypeScript
     * compiler is not able to check this!
     */
    public set(value: T, ...i: number[]): void {
        this.data[this.index(i, false)] = value;
    }

    /**
     * Bounds checking version of {@link get}, validates that the
     * index `i` is alowed
     *
     * @param i Arguments representing the indices
     */
    public getSafely(...i: number[]): T {
        return this.data[this.index(i, true)];
    }

    /**
     * Bounds checking version of {@link get}, validates that the
     * index `i` is alowed
     *
     * @param value New value to set into the tensor
     *
     * @param i Arguments representing the indices
     */
    public setSafely(value: T, ...i: number[]): void {
        this.data[this.index(i, true)] = value;
    }

    protected index(i: number[], check: boolean) {
        if (i.length !== this._dim.length) {
            throw Error(`Incorrect length index ${i.length}, expected ${this._dim.length}`);
        }
        if (check) {
            this.checkIndex(...i);
        }
        let ret = this.offset;
        for (let j = 0; j < this.rank; ++j) {
            ret += i[j] * this.stride[j];
        }
        return ret;
    }

    protected checkIndex(...i: number[]) {
        for (let d = 0; d < i.length; ++d) {
            const j = i[d];
            if (j < 0 || j >= this._dim[d]) {
                const upper = this._dim[d] - 1;
                if (this._dim.length === 1) {
                    throw Error(`Index ${j} is out of range [0, ${upper}]`);
                } else {
                    throw Error(`Index ${j} for dimension ${d} is out of range`
                                + ` [0, ${upper}]`);
                }
            }
        }
    }
}
