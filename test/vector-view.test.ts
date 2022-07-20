import { VectorView } from "../src/vector-view";

describe("construction", () => {
    it("can construct a vector view", () => {
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const v = new VectorView(data, 0, 3);
        expect(v.data).toBe(data);
        expect(v.length()).toBe(4);
        expect(v.get(0)).toBe(0);
        expect(v.get(1)).toBe(3);
        expect(v.toArray()).toEqual([0, 3, 6, 9]);
    });
});
