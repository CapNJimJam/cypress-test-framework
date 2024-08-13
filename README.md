
# Cypress Test Framework

This repository contains a basic test framework using Cypress and TypeScript to validate the functionality of a web application and an API.

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- Cypress

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/CapNJimJam/cypress-test-framework.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cypress-test-framework
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```


## Running Tests

### Browser (UI) Tests

- To run all UI tests:
  ```bash
  npm run cypress:run
  ```

- To open Cypress in interactive mode:
  ```bash
  npm run cypress:open
  ```

### API Tests

- The API tests can be run in the same way as the UI tests using the above commands.

## Folder Structure

- All test files are located under the `cypress` directory.
- `e2e/` contains the UI and API test files.
- `fixtures/` may contain any test data needed for the tests. 
- `support/` may contain custom commands and reusable functions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
