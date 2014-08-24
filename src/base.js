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

  update: function(id, args) {
    return this.forge({ id: id })
      .save(args, { method: 'update', patch: true });
  },

  findOne: function(args) {
    return this.forge(args).fetch({ require: true });
  }
});

module.exports = Base;
