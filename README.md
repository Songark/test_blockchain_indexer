# Blockchain Indexer

Home assessment, Blockchain Indexer developed by Chanthai Sihabouth 
(Github: https://github.com/Songark, 
LinkedIn: https://www.linkedin.com/in/chanthai-sihabouth-8aaa06143, 
Resume: https://career.io/r/kmTkGBaUr)

## Getting Started

### How to run

```bash
# Go to the root directory of the project
$ cd test_blockchain_indexer
```

### Node.js Packages

Once in the root directory, use the Node package manager npm to install chai and mocha.

```bash
$ npm install
```

### Running Unit Tests

```bash
$ npm test
```

## Design patterns

### Object-Oriented Design:

The problem is inherently object-based, given the notion of accounts and their attributes.
Using classes (like Account and SolanaIndexer) makes the code more structured, modular, and easier to read, enhancing maintainability.
With classes, it's easier to encapsulate data and methods that operate on that data, thus making the data more secure and the methods more controlled.

### Singleton Pattern:

The SolanaIndexer class effectively acts as a singleton, i.e., we're likely to have only one instance of it running that handles all account updates.
This ensures centralized control, especially when you consider potential extensions where the indexer might communicate with other systems or need centralized control over resources (like callbacks or even potential database connections).

### Map for Storing Accounts:

Maps (or dictionaries) provide constant-time complexity (O(1)) for key-based lookup, insertion, and deletion.
Given that accounts have a unique ID, using a Map to store accounts by their ID ensures efficient operations when checking for the existence of an account, updating it, or inserting a new one.

### Callback Management with setTimeout:

The requirements specified real-time behavior with certain actions (like ingestion and logging) happening after specific time intervals.
The setTimeout provides this capability.
By storing the reference to the timeout in the account object, we can manage (cancel, if necessary) the callback associated with each account.

### Proactive Callback Cancellation:

Instead of waiting to see if a newer version invalidates an older version, the design proactively cancels the older version's callback upon ingestion of the newer version.
This approach minimizes resource usage as there aren’t multiple pending callbacks for the same account unnecessarily waiting to be executed.

### Random Ingestion Time:

The random ingestion time between 0 and 1000ms is implemented using Math.random() \* 1000 to simulate the continuous uniform distribution as described in the problem statement.

### Asynchronous File Reading:

Used Node's fs.promises to read the JSON asynchronously. This ensures that the event loop is not blocked, allowing other operations or requests to be processed in the meantime.
This method of reading is more "real-time friendly" as it doesn't halt the entire process waiting for file read operations.

## Observability for production

### Logging:

Enhanced Logging to capture various system and transactional events.

### Metrics:

Metrics give us quantifiable data on the performance and health of our system.

- Ingestion Rate: Number of account updates ingested per minute/second.
- Callback Rate: Number of callbacks triggered and completed per minute/second.
- Error Rate: Track failed ingestions, failed callbacks, or any other type of error.

### Alerting:

Set up real-time alerts for anomalous behaviors.

- Error Rate Thresholds: Alert if the error rate goes above a certain threshold.
- Resource Usage Thresholds: E.g., memory or CPU usage.
- Late or Missed Callbacks: If callbacks are delayed beyond a certain point or not fired at all.

## Rollout Monitoring

When rolling this out in a production environment, the primary focus would be on:

- Smoke Testing: After deployment, run basic tests to ensure the system is functioning.
- Canary Deployments: Initially, release the system to a subset of users to gauge its performance and catch potential issues before a full-scale deployment.
- Rollback Strategy: Have a strategy in place to rollback the deployment if severe issues are detected.
- User Feedback Loop: Establish a mechanism to gather user feedback, which can be instrumental in identifying issues or areas of improvement.
