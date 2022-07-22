import { Vector } from "../src/vector";
import { seq } from "../src/util";

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

    it("can get and set data", () => {
        const v = new Vector(seq(5));
        expect(v.get(2)).toBe(2);
        expect(v.getSafely(3)).toBe(3);
        
        v.set(-2, 2);
        v.setSafely(-3, 3);
        
        expect(v.get(2)).toBe(-2);
        expect(v.getSafely(3)).toBe(-3);
        expect(v.toArray()).toEqual([0, 1, -2, -3, 4]);
    });

    it("can prevent out of bounds access", () => {
        const data = [1, 2, 3, 4];
        const v = new Vector(data);
        
        expect(() => v.getSafely(4))
            .toThrow("Index 4 is out of range [0, 3]")
        expect(() => v.getSafely(-5))
            .toThrow("Index -5 is out of range [0, 3]")
        expect(() => v.setSafely(0, 4))
            .toThrow("Index 4 is out of range [0, 3]")
        expect(() => v.setSafely(0, -5))
            .toThrow("Index -5 is out of range [0, 3]")
    });
});
