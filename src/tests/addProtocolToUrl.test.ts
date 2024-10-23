import { expect } from "chai";
import { addProtocolToUrl } from "../utils/utils";

describe("addProtocolToUrl", () => {
  it("should return the URL as is if it already has a protocol", () => {
    const inputUrl = "https://www.example.com";
    const expectedUrl = "https://www.example.com/";

    const result = addProtocolToUrl(inputUrl);
    expect(result).to.equal(expectedUrl);
  });

  it("should add http protocol if the URL does not have a protocol", () => {
    const inputUrl = "www.example.com";
    const expectedUrl = "http://www.example.com/";

    const result = addProtocolToUrl(inputUrl);
    expect(result).to.equal(expectedUrl);
  });

  it("should handle URLs with paths and add protocol correctly", () => {
    const inputUrl = "example.com/path/to/page";
    const expectedUrl = "http://example.com/path/to/page";

    const result = addProtocolToUrl(inputUrl);
    expect(result).to.equal(expectedUrl);
  });

  it("should handle URLs with query parameters and add protocol correctly", () => {
    const inputUrl = "example.com?search=test";
    const expectedUrl = "http://example.com/?search=test";

    const result = addProtocolToUrl(inputUrl);
    expect(result).to.equal(expectedUrl);
  });

  it("should handle URLs with special characters and add protocol correctly", () => {
    const inputUrl = "example.com/path?name=Josip";
    const expectedUrl = "http://example.com/path?name=Josip";

    const result = addProtocolToUrl(inputUrl);
    expect(result).to.equal(expectedUrl);
  });
});
