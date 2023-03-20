import { queryString, parse } from "./queryString";

describe("Object to query string", () => {
  test("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Brendon",
      age: 23,
    };
    expect(queryString(obj)).toBe("name=Brendon&age=23");
  });
  test("should create a valid query string even when an array is passed as value", () => {
    const obj = {
      name: "Brendon",
      abilities: ["Python", "Java"],
    };
    expect(queryString(obj)).toBe("name=Brendon&abilities=Python,Java");
  });
  test("should throw an error when an object is passed as value", () => {
    const obj = {
      name: "Brendon",
      abilities: { first: "Python", second: "Java" },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
  test("should throw an error when the parameter from method is empty", () => {
    const obj = {};
    expect(() => {
      queryString(obj);
    }).toThrowError();
    // expect(() => {
    //   queryString();
    // }).toThrowError();
  });
});

describe("Query string to object", () => {
  test("should convert a query string to object ", () => {
    const qs = "name=Brendon&age=23";
    expect(parse(qs)).toEqual({
      name: "Brendon",
      age: "23",
    });
  });
  test("should convert a query string of a single key-value to object ", () => {
    const qs = "name=Brendon";
    expect(parse(qs)).toEqual({
      name: "Brendon",
    });
  });
  test("should convert a query string to an object taking care of comma separated values ", () => {
    const qs = "name=Brendon&abilities=Python,Java";
    expect(parse(qs)).toEqual({
      name: "Brendon",
      abilities: ["Python", "Java"],
    });
  });
});
