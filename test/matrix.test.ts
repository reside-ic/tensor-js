import {Matrix} from "../src/matrix";

describe("matrix", () => {
    it("can construct a matrix of numbers", () => {
        const m = new Matrix(3, 5, 0);
        expect(m.dim()).toEqual([3, 5]);
        expect(m.data).toEqual(Array(15).fill(0));
    });
});
