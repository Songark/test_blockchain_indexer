const chai = require("chai");
const expect = chai.expect;
const fs = require("fs").promises;
const Account = require("../account");
const SolanaIndexer = require("../app");

describe("Account Class", function () {
  it("should instantiate properly", function () {
    let account = new Account("ID1", "TypeA", {}, 10, 1, 500);
    expect(account.id).to.equal("ID1");
    expect(account.tokens).to.equal(10);
  });

  it("should handle invalid data types", function () {
    expect(() => new Account({}, "TypeA", {}, 10, 1, 500)).to.throw();
  });
});

describe("Account Boundary Tests", function () {
  it("should handle maximum token values", function () {
    let account = new Account("ID2", "TypeB", {}, Number.MAX_VALUE, 1, 500);
    expect(account.tokens).to.equal(Number.MAX_VALUE);
  });
});
