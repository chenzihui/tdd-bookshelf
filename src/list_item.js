'use strict';

var Base = require('./base'),

    ListItem;

ListItem = Base.Model.extend({
  tableName: 'list_items'
},{

  allowedColumns: ['title'],

  findByList: function(listId) {
    return this.findMany('list_id', listId);
  }
});

module.exports = ListItem;
