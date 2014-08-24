'use strict';

var _       = require('underscore'),
    Promise = require('bluebird'),
    Base    = require('./base'),

    ListItem;

ListItem = Base.Model.extend({
  tableName: 'list_items'
},{

  allowedColumns: ['title'],

  findByList: function(listId) {
    return this.findMany('list_id', listId);
  },

  deleteByList: function(listId) {
    var self = this,
        promises;

    return self.findByList(listId)
    .then(function(items) {

      promises = _.map(items.toJSON(), function(item) {
        return self.delete(item.id);
      });

      return Promise.all(promises);
    });
  }
});

module.exports = ListItem;
