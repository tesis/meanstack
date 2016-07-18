// test.auth.js
// make test

/*
tested create, find, delete user from accounts
 */
'use strict';

var should = require("should");
var mongoose = require('mongoose');
var user = require("../server/models/auth.js");
var db;

describe('user', function() {

  before(function(done) {
    db = mongoose.connect('mongodb://localhost/localapp');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });


  it('insert new user', function(done) {
    var auth = new user({
      username: 'test',
      password: 'testpass'
    });

    auth.save(function(error) {
      if (error) console.log('error-auth.js: ' + error.message);
      else console.log('no error');
      done();
    });
  });

  it('find a user by username', function(done) {
    user.findOne({ username: 'test' }, function(err, user) {
      user.username.should.eql('test');
      done();
    });
  });

  it('delete user by username', function(done) {
    user.remove({ username: 'test' }, function(err, user) {
      done();
    });
  });
  // delete collection
  /*afterEach(function(done) {
    user.remove({}, function() {
      done();
    });
  });*/

});