'use strict';

var Knex      = require('knex'),
    Bookshelf = require('bookshelf'),
    Promise   = require('bluebird'),

    config    = require('./config'),

    Base;

Base = Bookshelf(Knex(config.database));

Base.Model = Base.Model.extend({}, {

  _strip: function(args) {
    var fields = {},
        self   = this;

    Object.keys(args).forEach(function(key) {
      if (self.allowedColumns.indexOf(key) >= 0) {
        fields[key] = args[key];
      }
    });

    return fields;
  },

  createNew: function(args) {
    return this.forge(args).save();
  },

  update: function(id, args) {
    var fields = this._strip(args);

    if (Object.keys(fields).length > 0) {
      return this.forge({ id: id })
        .save(fields, { method: 'update', patch: true });
    } else {
      return Promise.reject('No fields to update');
    }
  },

  delete: function(id) {
    return this.forge({ id: id }).destroy();
  },

  findOne: function(args) {
    return this.forge(args).fetch({ require: true });
  }
});

module.exports = Base;
