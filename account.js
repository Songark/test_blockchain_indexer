class Account {
  constructor(id, accountType, data, tokens, version, callbackTimeMs) {
    if (typeof id !== "string") {
      throw "Invalid account id";
    }
    this.id = id;
    this.accountType = accountType;
    this.data = data;
    this.tokens = tokens;
    this.version = version;
    this.callbackTimeMs = callbackTimeMs;
    this.callback = null;
  }
}

module.exports = Account;
