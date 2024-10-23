import path from "path";
import fs from "fs";
import {
  addProtocolToUrl,
  excludeFalsyValues,
  extractLastUrl,
  extractValidArrays,
  getTitleAndEmailFromHTML,
  removeProtocolFromUrl,
} from "./utils/utils";
import { fetchUrl } from "./services/fetchService";
import { oneMinuteInMs } from "./constants/appConstants";
import { ErrorStrings } from "./constants/errorStrings";

const args = process.argv.slice(2);

const filePath = args[0];
const fetchedUrls: string[] = [];

if (filePath) {
  const resolvedPath = path.resolve(__dirname, filePath);
  parseTextFile(resolvedPath);
} else {
  handleStdin();
}

async function handleStdin() {
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", async (chunk: string) => {
    await processUrlsFromText(chunk);
  });

  process.stdin.on("error", (err) => {
    console.error(ErrorStrings.STDIN_ERROR, err);
  });
}

async function processUrlsFromText(text: string) {
  const validArrays = extractValidArrays(text);

  const promises = validArrays.map(async (validArray) => {
    const urlToFetch = extractLastUrl(validArray);
    try {
      if (!urlToFetch) return;
      const urlWithProtocol = addProtocolToUrl(urlToFetch);

      const urlExists = fetchedUrls.some(
        (fetchedUrl) =>
          removeProtocolFromUrl(fetchedUrl) ===
          removeProtocolFromUrl(urlWithProtocol)
      );

      if (!urlExists) {
        const response = await scrapePage(urlWithProtocol);
        if (response) console.log(response);
      }
    } catch (error: any) {
      console.log(ErrorStrings.GENERIC_ERROR, error.message);
    }
  });

  await Promise.allSettled(promises);
}

async function parseTextFile(pathToFile: string) {
  try {
    const fileContent = fs.readFileSync(pathToFile, { encoding: "utf8" });
    await processUrlsFromText(fileContent);
  } catch (error) {
    console.error(ErrorStrings.GENERIC_ERROR, error);
  }
}

async function scrapePage(url: string) {
  try {
    fetchedUrls.push(url);
    const data = await fetchUrl(url);
    const titleAndEmail = getTitleAndEmailFromHTML(data);

    return excludeFalsyValues({ url, ...titleAndEmail });
  } catch (error) {
    return await retryRequest(url);
  }
}

async function retryRequest(url: string) {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await fetchUrl(url);
        const titleAndEmail = getTitleAndEmailFromHTML(data);
        resolve(excludeFalsyValues({ url, ...titleAndEmail }));
      } catch (error: any) {
        console.error(ErrorStrings.FETCH_FAILED, error.message);
        reject(error);
      }
    }, oneMinuteInMs);
  });
}
