const chai = require("chai");
const expect = chai.expect;
const fs = require("fs").promises;

const SolanaIndexer = require("../app");

describe("Indexer function", () => {
  it("should test with the provided simple data", () => {
    const indexer = new SolanaIndexer();

    // Test with some sample data
    const testData = [
      {
        id: "ID1",
        accountType: "type1",
        data: {},
        tokens: 500,
        version: 1,
        callbackTimeMs: 400,
      },
      {
        id: "ID1",
        accountType: "type1",
        data: {},
        tokens: 500,
        version: 3,
        callbackTimeMs: 500,
      },
    ];

    fs.writeFile("testData.json", JSON.stringify(testData), "utf-8")
      .then(() => indexer.ingest("testData.json"))
      .catch((err) => console.error(err));
  });

  it("should test with the provided json file", () => {
    // Test with json data
    (async () => {
      const indexer = new SolanaIndexer();
      await indexer.ingest("json/input.json");
      indexer.shutdown();
    })();
  });
});
