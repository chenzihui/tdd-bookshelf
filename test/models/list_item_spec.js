'use strict';

var List     = require('../../src/list'),
    ListItem = require('../../src/list_item'),

    db       = require('../support/db');

describe('List item', function() {

  var listArgs = { name: 'Test List' },
      _list;

  beforeEach(function(done) {
    List.createNew(listArgs)
    .then(function(list) {
      _list = list;
      done();
    });
  });

  afterEach(function(done) {
    db.cleanUp().then(function() {
      done();
    });
  });

  it('should allow creating a new list item', function(done) {
    var args = { list_id: _list.id, title: 'New Item' },
        listItem;

    ListItem.createNew(args)
    .then(function(result) {
      listItem = result.toJSON();

      expect(listItem.title).to.equal(args.title);
      expect(listItem.list_id).to.equal(_list.id);
      done();
    });
  });

  it('should allow retrieving a single item');
  it('should allow retrieving items from a particular list');

  it('should allow updating a list item');
  it('should not allow updating invalid columns');

  it('should allow deleting a single list item');
  it('should allow deleting all items from a list');
});
