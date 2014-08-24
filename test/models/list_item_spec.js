'use strict';

var _        = require('underscore'),
    List     = require('../../src/list'),
    ListItem = require('../../src/list_item'),

    db       = require('../support/db');

describe('List item', function() {

  var listArgs = { name: 'Test List' },
      _list;

  beforeEach(function(done) {
    List.createNew(listArgs)
    .then(function(list) {
      _list = list.toJSON();
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

  describe('Manipulating items', function() {

    var _item;

    beforeEach(function(done) {
      var args = { list_id: _list.id, title: 'New Item' }

      ListItem.createNew(args)
      .then(function(item) {
        _item = item.toJSON();
        done();
      });
    });

    it('should allow retrieving a single item', function(done) {
      var item;

      ListItem.findOne({ id: _item.id })
      .then(function(result) {
        item = result.toJSON();

        expect(item.title).to.equal(_item.title);
        expect(item.list_id).to.equal(_item.list_id);
        done();
      });
    });

    it('should allow retrieving items from a particular list', function(done) {
      var _l2, _i2, _i3, items, ids;

      List.createNew({ name: 'Another List' })
      .then(function(list) {
        _l2 = list.toJSON();

        return ListItem.createNew({ list_id: _list.id, title: 'Another Item' });
      })
      .then(function(item) {
        _i2 = item.toJSON();

        return ListItem.createNew({ list_id: _l2.id, title: 'One More' });
      })
      .then(function(item) {
        _i3 = item.toJSON();

        return ListItem.findByList(_list.id)
      })
      .then(function(results) {
        items = results.toJSON();

        expect(items.length).to.equal(2);

        ids = _.pluck(items, 'id');
        expect(ids).to.contain(_item.id)
        expect(ids).to.contain(_i2.id);
        expect(ids).not.to.contain(_i3.id);
        done();
      });
    });

    it('should allow updating a list item', function(done) {
      var newArgs = { title: 'New Title' },
          _i;

      ListItem.update(_item.id, newArgs)
      .then(function(item) {
        _i = item.toJSON();

        expect(_i.title).to.equal(newArgs.title);
        done();
      });
    });

    it('should not allow updating invalid columns', function(done) {
      var newArgs = {
        created_at: new Date(2014, 7, 20)
      };

      ListItem.update(_item.id, newArgs)
      .catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should allow deleting a single list item', function(done) {
      ListItem.delete(_item.id)
      .then(function() {
        return ListItem.findOne({ id: _item.id });
      })
      .catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should allow deleting all items from a list');
  });
});
