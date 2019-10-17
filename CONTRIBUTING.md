How to Contribute
==
Reporting Bugs
--
Report issues you've discovered via the [issue tracker](https://github.com/anapanda/kummit/issues).

Submitting Work
--
Create a pull requests against `master` branch. And describe in detail the work you've done.

Documentation
--
Please document your code using the [jsdoc](https://github.com/jsdoc/jsdoc) standard.

Testing
--
There are 3 types of tests within Kummit, coding standards tests via [eslint](https://eslint.org), the API is unit tested using [mocha](https://mochajs.org/) with [should.js](https://shouldjs.github.io/), and integration tests are done via [cypress](https://cypress.io).

### Tools to Install

`yarn global add mocha cypress eslint`

The rest are included with the build tools.

### ESlint tests

These will make sure that all the code that's contributed is consistent and readable.

Run the frontend tests with
* `yarn --cwd app lint:js`
* `yarn --cwd app lint:hbs`

Run the backend tests with
* `yarn --cwd api lint:js`

Modern text editors can show you these errors and warnings in real time while coding if configured correctly.

### API Unit tests
Tests are located in the `api/test` folder, there should be a test file for each API resource (so one for every file in `api/routes`), these may be broken apart if there are enough tests to warrent it.

There is also a global.test.js file that closes the db connection after all the tests are finished.

Within each file the tests are grouped by the REST methods __*GET, POST, PUT, DELETE*__.

### Writing API tests with `Mocha` & `should.js`
Tests are grouped using `describe()` and tests are wrapped in `it()` with a semantic name for the test, be sure to pass it a promise or async function if the test is asyncronous which for the API is mostly the case.

Use `beforeEach()` to setup and teardown the test database.

Use `chai-http` and `chai.request()` to retrive the API response for testing.

Finally test the response using `should.js`, which add `should` & others to every object, allowing to write almost plain english tests e.g. `response.body.should.equal('Hello World')`

Try to test for everything that should go right and wrong.

Run all the the tests using the `mocha` from the `api` directory or `mocha path/to/test/file.test.js` to run a single file.

### Frontend/Integration tests using `cypress`

Tests are located within the `cypress/integration` directory.

They should be "end-to-end" tests, in that they test the whole stack at once rather than each in isolation.

They should test the interaction of the frontend, and makes sure they behave as they should, as well as it's interaction with the backend.

Test each ember route for functionality and interaction.

At a bare minimum, visit the page and check that it loads correctly.

Additionally, test form interactivity, error messages, buttons etc.

[Cypress API documentation and examples](https://docs.cypress.io/api/api/table-of-contents.html).