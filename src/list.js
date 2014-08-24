'use strict';

var Base = require('./base'),

    List;

List = Base.Model.extend({

  tableName: 'lists'

}, {

  allowedColumns: ['name']
});

module.exports = List;
