'use strict';

var Knex      = require('knex'),
    Bookshelf = require('bookshelf'),

    config    = require('./config'),

    Base;

Base = Bookshelf(Knex(config.database));

Base.Model = Base.Model.extend({}, {

  createNew: function(args) {
    return this.forge(args).save();
  },

  findOne: function(args) {
    return this.forge(args).fetch({ require: true });
  }
});

module.exports = Base;
