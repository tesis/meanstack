// test.contacts.js
// make test
/*
tested create, find, update, delete contact from contacts
 */
'use strict';

var should = require("should");
var mongoose = require('mongoose');
var contact = require("../server/models/contacts.js");
var db;

describe('contact', function() {

  before(function(done) {
    db = mongoose.connect('mongodb://localhost/localapp');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  it('insert new record', function(done){
    var auth = new contact({
      username: 'test',
      password: 'testpass',
      fname: 'tesi',
      lname: 'tesi',
      email: 'tesi@tesi.si'
    });

    auth.save(function(error) {
      if (error) console.log('error-contact.js: ' + error.message);
      else console.log('no error');
      done();
    });
  });
  it('update non-required fields', function(done) {
    // find contact by username
    var id;
    contact.findOne({ username: 'test' }, function(err, res) {
      res.username.should.eql('test');
      id = res._id;

      var conditions = {"_id": id};
      var update = {$set: {
                          username: 'test',
                          password: 'testpass',
                          fname: 'tesi updated',
                          lname: 'tesi',
                          email: 'tesi@tesi.si'
                        }};
      var options = {new: true, upsert: true};

      contact.findOneAndUpdate(conditions, update, options, function(err, contact) {
        contact.username.should.eql('test');
        done();
      });
    });
  });

  it('update required fields', function(done) {
    // find contact by username
    var id;
    contact.findOne({ username: 'test' }, function(err, res) {
      res.username.should.eql('test');
      id = res._id;

      var conditions = {"_id": id};
      var update = {$set: {
                          username: 'test1Up',
                          password: 'testpass',
                          fname: 'tesi updated',
                          lname: 'tesi',
                          email: 'tesi@tesi.si'
                        }};
      var options = {new: true, upsert: true};

      contact.findOneAndUpdate(conditions, update, options, function(err, contact) {
        contact.username.should.eql('test1Up');
        done();
      });
    });
  });

  it('update contact', function(done) {
    contact.findOne({ username: 'test1Up' }, function(err, contact) {
      contact.username.should.eql('test1Up');
      done();
    });
  });

  it('delete contact by username', function(done) {
    contact.remove({ username: 'test1Up' }, function(err, contact) {
      done();
    });
  });

});