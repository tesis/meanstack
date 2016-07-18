// test.users.js
// make test
/*
tested list users, find user
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



  it('find a particular user', function(done) {
    // find user by username
    var id;
    user.findOne({ username: 'tesi' }, function(err, res) {
      res.username.should.eql('tesi');
      id = res._id;
      res.id.should.eql('57714de5fe424ab81b238a8b');
      done();
    });
  });

  it('find all users', function(done) {
    var id;
    user.find({},{username:1}, function(err, res) {
      // console.log(res)
      res.should.not.eql(1);
      res.should.not.eql(0);
      res.length.should.be.above(1);
      //console.log(res.length)
      done();

    });
  });

});