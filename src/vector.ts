import {Tensor} from "./tensor";

/**
 * A vector is the simplest and least ambiguous form of {@link Tensor}
 * objects because there is no doubt about how it is ordered, and how
 * elements are accessed. There is really very little advantage in
 * using it over an `Array`, really! See also {@link VectorView}
 */
export class Vector<T> extends Tensor<T> {
    /**
     * Construct a new vector
     *
     * @param data Underlying data. Note that this will not be copied.
     */
    constructor(data: T[]) {
        super(data, [data.length]);
    }

    public get(i: number): T {
        return this.data[i];
    }

    public set(value: T, i: number): void {
        this.data[i] = value;
    }

    public getSafely(i: number): T {
        this.checkIndex(i);
        return this.get(i);
    }

    public setSafely(value: T, i: number): void {
        this.checkIndex(i);
        this.set(value, i);
    }

    /**
     * Convert the Vector into a new JavaScript Array. This *does*
     * copy the data, meaning that it is independent from the original
     * Vector.
     */
    public toArray(): T[] {
        return this.data.slice();
    }
}
