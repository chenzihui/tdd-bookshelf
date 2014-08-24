'use strict';

var db   = require('../support/db'),

    List = require('../../src/list');

describe('List', function() {

  var args = { name: 'Test List' }

  afterEach(function(done) {
    db.cleanUp()
    .then(function() {
      done();
    });
  });

  it('should allow creating a new list', function(done) {
    var list;

    List.createNew(args)
    .then(function(result) {
      return List.findOne({ id: result.id });
    })
    .then(function(result) {
      list = result.toJSON();

      expect(list.name).to.equal(args.name);
      done();
    });
  });

  describe('Manipulating lists', function() {

    var _list;

    beforeEach(function(done) {
      List.createNew(args)
      .then(function(list) {
        _list = list.toJSON();
        done();
      });
    });

    it('should allow editing an existing list', function(done) {
      var newArgs = { name: 'New Name' },
          list;

      List.update(_list.id, newArgs)
      .then(function(result) {
        list = result.toJSON();

        expect(list.name).not.to.equal(_list.name);
        expect(list.name).to.equal(newArgs.name);
        done();
      });
    });

    it('should not allow editing date columns', function(done) {
      var newArgs = {
        created_at: new Date(2014, 8, 20),
        updated_at: new Date(2014, 7, 21)
      },

      list;

      List.update(_list.id, newArgs)
      .catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should allow deleting existing lists', function(done) {
      List.delete(_list.id)
      .then(function() {
        return List.findOne(_list.id);
      })
      .catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });
  });
});
