import { expect } from "chai";
import { extractLastUrl } from "../utils/utils";

describe("extractLastUrl", () => {
  it("should detect url", () => {
    const input = "other example [ www.google.com ] fg";
    const expected = "www.google.com";
    expect(extractLastUrl(input)).to.equal(expected);
  });

  it("should detect last url", () => {
    const input =
      "multiple urls [bla [www.first.com] asdfasdf www.second.com truc]";
    const expected = "www.second.com";
    expect(extractLastUrl(input)).to.equal(expected);
  });

  it("should return null if there are no URLs found", () => {
    const input = "There are no links in this text.[test test]";
    const expected = null;
    expect(extractLastUrl(input)).to.equal(expected);
  });

  it("should handle text with no URLs but contains similar patterns", () => {
    const input =
      "There is no valid url but something like this www[dot]example[dot]com";
    const expected = null;
    expect(extractLastUrl(input)).to.equal(expected);
  });

  it("should handle URLs with query parameters", () => {
    const input =
      "A link with parameters https://example.com?page=2 and another https://example.org?id=10";
    const expected = "https://example.org?id=10";
    expect(extractLastUrl(input)).to.equal(expected);
  });
});
