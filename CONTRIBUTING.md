


How to Contribute
==
Reporting Bugs
--
Report issues you've discovered via the [issue tracker](https://github.com/tunapanda/wikonnect/issues).

Issue Labeling
--
Wikonnect uses [StandardIssueLabels](https://github.com/wagenet/StandardIssueLabels) for Github Issues.

Issues
--
Think you've found a bug or have a new feature to suggest? Let us know!

Reporting a Bug
--
1. Update to the most recent master release if possible. We may have already
fixed your bug.

2. Search for similar issues. It's possible somebody has encountered
this bug already.

3. Provide very specific steps to reproduce the error. If we cannot reproduce it, we will
close the ticket.

4. Your issue will be verified. The provided example will be tested for
correctness. The Wikonnect team will work with you until your issue can
be verified.

5. Keep up to date with feedback from the Wikonnect team on your ticket. Your
ticket may be closed if it becomes stale.

6. If possible, submit a Pull Request with a failing test. Better yet, take
a stab at fixing the bug yourself if you can!

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action.

Creating a pull requests
--
We love contributors

1. For the repo. Always create a new branch from the latest master and work on a feature or a bug fix branch. Learn more about git branches [here](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell).
2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `yarn install && yarn test`.
3. Make the tests pass
4. Commit your changes. Please use an appropriate commit prefix. If your pull request fixes an issue specify it in the commit message. Some examples:

```markdown
[DOC beta] Update CONTRIBUTING.md for commit prefixes
[FEATURE query-params-new] Message
[BUGFIX beta] Message
[SECURITY CVE-111-1111] Message
```
5. Push to your fork and submit a pull request. Please provide us with some explanation of why you made the changes you made. For new features make sure to explain a standard use case to us.

6. Once your feature is done, create a pull requests against `master` branch. And describe in detail the work you've done.


Documentation
--
Please document your code using the [jsdoc](https://github.com/jsdoc/jsdoc) standard.

Testing
--
There are 3 types of tests within Wikonnect
- Coding standards tests via [eslint](https://eslint.org)
- The API is unit tested using [mocha](https://mochajs.org/) with [should.js](https://shouldjs.github.io/)
- Integration tests are done via [cypress](https://cypress.io).

Travis CI Tests
--
We use Travis CI to test each PR before it is merged.

When you submit your PR (or later change that code), a Travis build will automatically be kicked off. A note will be added to the PR, and will indicate the current status of the build.
Submitting Work

### Tools to Install

`yarn global add mocha cypress eslint chai chai-http`

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