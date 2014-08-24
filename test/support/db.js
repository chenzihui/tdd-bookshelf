'use strict';

var knex     = require('knex'),
    knexfile = require('../../knexfile'),

    db   = knex(knexfile.test);

exports.cleanUp = function() {
  return db.migrate.rollback(knexfile.test.migrations)
  .then(function() {
    return db.migrate.latest(knexfile.test.migrations);
  });
};
