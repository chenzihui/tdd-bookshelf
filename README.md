# What is this?

A basic introduction to creating models with Bookshelf.js.

## To run the tests

You will first need to set up your database configuration which can be found in
`src/config.json` and `knexfile.js`.

Once that is done, run `NODE_ENV=test knex migrate:latest` to create the necessary tables.

After which, `npm install` followed by `make test` will run the test suite.
