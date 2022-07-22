import {Tensor} from "./tensor";

/**
 * A VectorView is the simplest and least ambiguous form of {@link
 * Tensor} objects because there is no doubt about how it is ordered,
 * and how elements are accessed. Unlike {@link Vector}, a VectorView
 * object can represent a lower-dimensional view of a
 * higher-dimensional object.
 *
* These will typically not be created by hand, but from methods on a
* higher dimensional object, such as a {@link Matrix} or {@link
* Tensor}.
 */
export class VectorView<T> extends Tensor<T> {
    constructor(data: T[], length: number, stride?: number, offset?: number) {
        stride = stride === undefined ? 1 : stride;
        super(data, [length], [stride], offset);
    }

    public toArray(): T[] {
        const len = this.length();
        const stride = this.stride[0];
        const ret = new Array(this.length());
        for (let i = 0, j = this.offset; i < len; ++i, j += stride) {
            ret[i] = this.data[j];
        }
        return ret;
    }
}
