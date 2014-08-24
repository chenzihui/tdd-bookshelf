'use strict';

var Base = require('./base'),

    ListItem;

ListItem = Base.Model.extend({
  tableName: 'list_items'
},{});

module.exports = ListItem;
