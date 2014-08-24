'use strict';

var Base = require('./base'),

    List;

List = Base.Model.extend({
  tableName: 'lists'
});

module.exports = List;
