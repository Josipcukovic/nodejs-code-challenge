import crypto from "crypto";
import { config } from "../config";
import { ErrorStrings } from "../constants/errorStrings";

export function excludeFalsyValues(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  );
}

export function removeProtocolFromUrl(url: string): string {
  const protocolRegex = /^https?:\/\//;
  return url.replace(protocolRegex, "");
}

export function addProtocolToUrl(inputUrl: string) {
  try {
    let url = new URL(inputUrl);
    return url.href;
  } catch (e) {
    try {
      let url = new URL("http://" + inputUrl);
      return url.href;
    } catch (e) {
      throw new Error(ErrorStrings.INVALID_URL);
    }
  }
}

export function getTitleAndEmailFromHTML(html: string) {
  try {
    const titleTagContentRegex = /<title.*>([^<]*)<\/title>/i;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    const titleMatch = html.match(titleTagContentRegex);
    const emailMatch = html.match(emailRegex);

    const title = titleMatch ? titleMatch[1] : undefined;

    const secretKey = config.IM_SECRET;
    const email = emailMatch
      ? crypto
          .createHmac("sha256", secretKey)
          .update(emailMatch[0])
          .digest("hex")
      : undefined;

    return { title, email };
  } catch (error) {
    console.error("Error fetching the URL or parsing HTML:", error);
  }
}

export function extractLastUrl(text: string) {
  const urlRegex = /(?:(?:https?:\/\/)|(?:www\.))\S+/g;
  const squareBracketsRegex = /[\[\]]/g;

  const matches = text.match(urlRegex);
  return matches
    ? matches[matches.length - 1].replace(squareBracketsRegex, "")
    : null;
}

export function extractValidArrays(input: string) {
  // Regex to match arrays, ignoring escaped square brackets
  const arrayRegex =
    /(?<!\\)\[((?:[^\[\]\\]|\\\[|\\\]|(?<!\\)\[[^\[\]]*\])*)\](?!\\)/g;

  const validArrays: string[] = [];
  let match: RegExpExecArray | null;

  // Find all matches using the regex
  while ((match = arrayRegex.exec(input)) !== null) {
    let arrayContent = match[1].trim();

    if (arrayContent.length > 0) {
      validArrays.push(match[0]);
    }
  }

  return validArrays;
}
