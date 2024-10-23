import { expect } from "chai";
import * as crypto from "crypto";
import { getTitleAndEmailFromHTML } from "../utils/utils";
import { config } from "../config";

const mockCryptoHash = (input: string, secret: string): string => {
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
};

describe("getTitleAndEmailFromHTML", () => {
  it("should return the correct title from HTML", () => {
    const html =
      "<html><head><title>Test Page</title></head><body></body></html>";
    const result = getTitleAndEmailFromHTML(html);
    expect(result?.title).to.equal("Test Page");
    expect(result?.email).to.be.undefined;
  });

  it("should return the correct email hash if an email is present", () => {
    const html =
      "<html><head><title>Test Page</title></head><body>Contact us at test@example.com</body></html>";

    const secretKey = config.IM_SECRET;
    const email = "test@example.com";
    const expectedHash = mockCryptoHash(email, secretKey);

    const result = getTitleAndEmailFromHTML(html);
    expect(result?.title).to.equal("Test Page");
    expect(result?.email).to.equal(expectedHash);
  });

  it("should handle both missing title and email correctly", () => {
    const html =
      "<html><head></head><body>No title or email here</body></html>";
    const result = getTitleAndEmailFromHTML(html);
    expect(result?.title).to.be.undefined;
    expect(result?.email).to.be.undefined;
  });

  it("should hash only first email in case of multiple e-mails", () => {
    const html =
      "<html><head><title>Test Page</title></head><body>Emails: test1@example.com, test2@example.com</body></html>";
    const secretKey = config.IM_SECRET;
    const firstEmail = "test1@example.com";
    const expectedHash = mockCryptoHash(firstEmail, secretKey);

    const result = getTitleAndEmailFromHTML(html);
    expect(result?.title).to.equal("Test Page");
    expect(result?.email).to.equal(expectedHash);
  });
});
