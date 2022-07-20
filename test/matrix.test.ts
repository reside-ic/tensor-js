import { Matrix } from "../src/matrix";
import { seq, zeros } from "../src/util";

describe("matrix", () => {
    it("can construct a matrix of numbers", () => {
        const m = new Matrix(zeros(15), 3, 5);
        expect(m.dim).toEqual([3, 5]);
        expect(m.data).toEqual(zeros(15));
    });

    it("can extract elements", () => {
        const m = new Matrix(seq(15), 3, 5);
        expect(m.get(0, 0)).toBe(0);
        //
        //      [,0] [,1] [,2] [,3] [,4]
        // [0,]    0    3    6    9   12
        // [1,]    1    4    7   10   13
        // [2,]    2    5    8   11   14
        //
        // The behaviour here depends critically on how we store
        // things...
        expect(m.get(2, 3)).toBe(11);
        expect(m.get(1, 2)).toBe(7);

        expect(() => m.getSafely(3, 2)).toThrow("Out of bounds");
    });

    it("can be converted to array-of-arrays", () => {
        const m = new Matrix(seq(15), 3, 5);
        const res0 = m.toArray(false);
        const res1 = m.toArray(true);
        console.log(res0);
        console.log(res1);

        expect(res0[3][2]).toBe(m.get(2, 3));
        expect(res0[2][1]).toBe(m.get(1, 2));
    });
});
