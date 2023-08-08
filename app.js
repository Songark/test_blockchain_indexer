const fs = require("fs").promises;
const Account = require("./account");

class SolanaIndexer {
  constructor() {
    this.accounts = new Map(); // Map: ID -> Account instance
  }

  async ingest(filePath) {
    const rawData = await fs.readFile(filePath, "utf-8");
    const accounts = JSON.parse(rawData);
    for (let account of accounts) {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
      this.ingestAccount(account);
    }
  }

  ingestAccount(accountData) {
    const { id, version, callbackTimeMs } = accountData;
    const existingAccount = this.accounts.get(id);

    // Check version
    if (existingAccount && existingAccount.version >= version) return;

    // Cancel old callback if exists
    if (existingAccount && existingAccount.callback) {
      clearTimeout(existingAccount.callback);
      console.log(
        `Callback for AccountId: ${id} V${existingAccount.version} was cancelled.`
      );
    }

    const newAccount = new Account(
      accountData.id,
      accountData.accountType,
      accountData.data,
      accountData.tokens,
      accountData.version,
      accountData.callbackTimeMs
    );

    // Set new callback
    newAccount.callback = setTimeout(() => {
      console.log(
        `[${callbackTimeMs}ms] - Callback for AccountId: ${id} V${version} fired.`
      );
    }, accountData.callbackTimeMs);

    this.accounts.set(id, newAccount);
    console.log(`AccountId: ${id} V${version} has been indexed.`);
  }

  shutdown() {
    let highestAccounts = {};

    this.accounts.forEach((account) => {
      if (
        !highestAccounts[account.accountType] ||
        account.tokens > highestAccounts[account.accountType].tokens
      ) {
        highestAccounts[account.accountType] = account;
      }
    });

    console.log("Highest token-value accounts by AccountType:");
    for (let accountType in highestAccounts) {
      console.log(
        `AccountType: ${accountType}, AccountId: ${highestAccounts[accountType].id}, Tokens: ${highestAccounts[accountType].tokens}`
      );
    }

    process.exit(0);
  }
}

module.exports = SolanaIndexer;
