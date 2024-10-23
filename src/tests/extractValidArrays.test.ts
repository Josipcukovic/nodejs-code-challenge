import { expect } from "chai";
import { extractValidArrays } from "../utils/utils";

describe("extractValidArrays", () => {
  it("should return empty array for input with no valid arrays", () => {
    const input = "bla bla asdfasdf www.google.com";
    const expected: string[] = [];

    expect(extractValidArrays(input)).to.deep.equal(expected);
  });

  it("should recognize simple valid array", () => {
    const input = "other example [ www.google.com ] fg";
    const expected: string[] = ["[ www.google.com ]"];

    expect(extractValidArrays(input)).to.deep.equal(expected);
  });

  it("should recognize valid array with mutliple words inside", () => {
    const input = "yet another example [ some text www.google.com ]";
    const expected: string[] = ["[ some text www.google.com ]"];

    expect(extractValidArrays(input)).to.deep.equal(expected);
  });

  it("should ignore escaped bracket", () => {
    const input = "\\[some text www.google.com] [www.test.com]";
    const expected: string[] = ["[www.test.com]"];

    expect(extractValidArrays(input)).to.deep.equal(expected);
  });

  it("should extract arrays with nested brackets", () => {
    const input = "some text [array [nested]] and [single].";
    const expected = ["[array [nested]]", "[single]"];
    expect(extractValidArrays(input)).to.deep.equal(expected);
  });
});
