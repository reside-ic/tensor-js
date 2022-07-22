import { VectorView } from "../src/vector-view";
import { seq } from "../src/util";

describe("construction", () => {
    it("can construct a vector view", () => {
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const v = new VectorView(data, 12 / 3, 3, 0);
        expect(v.data).toBe(data);
        expect(v.length()).toBe(4);
        expect(v.get(0)).toBe(0);
        expect(v.get(1)).toBe(3);
        expect(v.toArray()).toEqual([0, 3, 6, 9]);
    });

    it("Can construct an offset vector view", () => {
        const data = seq(12);
        const v = new VectorView(data, 5, 1, 4);
        expect(v.data).toBe(data);
        expect(v.length()).toBe(5);
        expect(v.get(0)).toBe(4);
        expect(v.get(1)).toBe(5);
        expect(v.toArray()).toEqual([4, 5, 6, 7, 8]);
    });

    it("Can construct a shortened vector view", () => {
        const data = seq(12);
        const v = new VectorView(data, 5);
        expect(v.data).toBe(data);
        expect(v.length()).toBe(5);
        expect(v.get(0)).toBe(0);
        expect(v.get(1)).toBe(1);
        expect(v.toArray()).toEqual(seq(5));
    });
});
