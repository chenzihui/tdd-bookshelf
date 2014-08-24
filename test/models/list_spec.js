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

  it('should allow editing an existing list', function(done) {
    var newArgs, list;

    List.createNew(args)
    .then(function(result) {
      newArgs = { name: 'New Name' };
      return List.update(result.id, newArgs);
    })
    .then(function(result) {
      list = result.toJSON();

      expect(list.name).to.equal(newArgs.name);
      done();
    });
  });
});
