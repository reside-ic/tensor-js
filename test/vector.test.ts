import { Vector } from "../src/vector";

describe("construction", () => {
    it("can construct a vector", () => {
        const data = [1, 2, 3, 4];
        const v = new Vector(data);
        expect(v.data).toBe(data);
        expect(v.length()).toBe(4);
        expect(v.get(2)).toBe(data[2]);
        expect(v.toArray()).toEqual(data);
        expect(v.toArray()).not.toBe(data);
    });
});
