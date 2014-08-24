'use strict';

var knex     = require('knex'),
    knexfile = require('../../src/config'),

    db   = knex(knexfile.database);

exports.cleanUp = function() {
  return db.migrate.rollback(knexfile.database.migrations)
  .then(function() {
    return db.migrate.latest(knexfile.database.migrations);
  });
};
