import {
    safeSum,
    safeSubtract,
    safeProduct
} from './safeSum.ts';

describe('Tests for utils.js', function () {

    test('Verify Addition Does not Introduce Repeating Decimals', () => {
        expect(safeSum(0.1, 0.2)).toBe(0.3); // 0.30000000000000004
        expect(safeSum(0.31, 0.6)).toBe(0.91); // 0.9099999999999999
        expect(safeSum(0.0123456789, 123456790.0)).toBe(123456790.01234569); // calculator: 123456790.0123457
        expect(safeSum(123456790.0123456, 123456790.0)).toBe(246913580.0123456); // calculator: 246,913,580.0123456
        expect(safeSum(0, 0.2)).toBe(0.2);
        expect(safeSum(0.1234567, 1234567.0)).toBe(1234567.1234567);
        expect(safeSum(111.1111, 235.323232)).toBe(346.434332);
        expect(safeSum(0.0001, 0.002)).toBe(.0021);
        expect(safeSum(0.002, 0.0001)).toBe(.0021);
        expect(safeSum(-0.0001, 0.002)).toBe(0.0019);
        expect(safeSum(0.0001, -0.002)).toBe(-0.0019);
    });

    test('Verify Subtraction Does not Introduce Repeating Decimals', () => {
        expect(safeSubtract(0.1, 0.2)).toBe(-0.1);
        expect(safeSubtract(0.31, 0.6)).toBe(-0.29);
        expect(safeSubtract(0.01234567, 123456790.0)).toBe(-123456789.98765432);
        expect(safeSubtract(123456790.0123456, 123456790.0)).toBe(0.0123456);
        expect(safeSubtract(0, 0.2)).toBe(-0.2);
        expect(safeSubtract(111.1111, 235.323232)).toBe(-124.212132);
        expect(safeSubtract(0.0001, 0.002)).toBe(-.0019);
        expect(safeSubtract(0.002, 0.0001)).toBe(.0019);
        expect(safeSubtract(-0.0001, 0.002)).toBe(-0.0021);
        expect(safeSubtract(0.0001, -0.002)).toBe(0.0021);
    });
    
    test('Verify Multiplication Does not Introduce Repeating Decimals', () => {
        expect(safeProduct(.1, .003)).toBe(.0003); // 0.00030000000000000003
        expect(safeProduct(.1223332, .003333333333333)).toBe(.00040777733333329256); // 0.00030000000000000003
    });
});