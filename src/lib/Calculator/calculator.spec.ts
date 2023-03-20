import { Sum } from "./calculator";
test("should sum 2 and 2 and the result must be 4", () => {
  expect(Sum(2, 2)).toBe(4);
});
test("should sum 2 and 2 even if one of them is a string and the result must be 4", () => {
  expect(Sum("2", "2")).toBe(4);
});
test("should throw an error if what is provided to the method can't be possible parse to number", () => {
  expect(() => {
    Sum("", "2");
  }).toThrowError();
  expect(() => {
    Sum([2, 2], []);
  }).toThrowError();
  expect(() => {
    Sum({}, {});
  }).toThrowError();
  expect(() => {
    Sum(2, "");
  }).toThrowError();
  expect(() => {
    Sum(NaN, NaN);
  }).toThrowError();
  expect(() => {
    Sum(undefined, undefined);
  }).toThrowError();
});
