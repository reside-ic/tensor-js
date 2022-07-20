import {Matrix} from "../src/matrix";

describe("matrix", () => {
    it("can construct a matrix of numbers", () => {
        const m = new Matrix(0, 3, 5);
        expect(m.dim).toEqual([3, 5]);
        expect(m.data).toEqual(Array(15).fill(0));
        console.log(m);
    });
});

describe("Float64Array usage", () => {
    it("Can be constructed at all", () => {
        const data = new Float64Array(15);
        const m = new Matrix(data, 3, 5);
        console.log(m);
    });
});
