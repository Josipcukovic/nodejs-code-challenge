import { expect } from "chai";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

describe("Command Line Script Integration Test", function () {
  const testFilePath = path.join(__dirname, "testFile.txt");

  beforeEach((done) => {
    const content = "[www.google.com]\n[www.facebook.com]\n[www.mathos.hr]";
    fs.writeFileSync(testFilePath, content, { encoding: "utf8" });
    done();
  });

  afterEach((done) => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    done();
  });

  it("should read the URLs from the file and process them", (done) => {
    exec(`npm run start ${testFilePath}`, (error, stdout, stderr) => {
      expect(stderr).to.be.empty;
      expect(stdout).to.include("http://www.google.com/");
      expect(stdout).to.include("http://www.facebook.com/");
      expect(stdout).to.include("http://www.mathos.hr/");
      done();
    });
  });
});
