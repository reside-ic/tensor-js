import {Tensor} from "../src/tensor";
import {seq} from "../src/util";

describe("array", () => {
    it("can construct a array of numbers", () => {
        const a = new Tensor(seq(60), [3, 4, 5]);
        expect(a.dim).toEqual([3, 4, 5]);
        expect(a.data).toEqual(seq(60));
        // A few accesses to show that we're on the right track:
        expect(a.get(0, 0, 0)).toEqual(0);
        expect(a.get(1, 0, 0)).toEqual(1);
        expect(a.get(1, 1, 0)).toEqual(4);
        expect(a.get(1, 1, 1)).toEqual(16);
        expect(a.get(2, 1, 3)).toEqual(41);
    });
});
