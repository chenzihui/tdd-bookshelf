'use strict';

var List     = require('../../src/list'),
    ListItem = require('../../src/list_item'),

    db       = require('../support/db');

describe('List item', function() {
  it('should allow creating a new list item');

  it('should allow retrieving a single item');
  it('should allow retrieving items from a particular list');

  it('should allow updating a list item');
  it('should not allow updating invalid columns');

  it('should allow deleting a single list item');
  it('should allow deleting all items from a list');
});
