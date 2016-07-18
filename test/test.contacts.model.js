'use strict';

/**
 * Module dependencies.
 */
var should = require("should");
var mongoose = require('mongoose');
// var contact = require("../server/models/contacts.js");

var Contact = mongoose.model('Contacts');
/**
 * Unit tests
 */
describe('Contacts Model', function() {

  describe('Saving', function() {
    /*it('saves new record',function(done){
      var contact = new Contact({
        username: 'test',
        password: 'testpass',
        fname: 'tesi',
        lname: 'tesi',
        email: 'tesi@tesi.si'
      });

      contact.save(function(error) {
        should.not.exist(error);
        done();
      });
    });*/

    it('throws validation error when username is empty',function(done){
      var contact = new Contact({
        password: 'testpass',
        fname: 'tesi',
        lname: 'tesi',
        email: 'tesi@tesi.si'
      });

      contact.save(function(error) {
        should.exist(error);
        // console.log(error);
        error.errors.username.message.should.equal('Path `username` is required.');
        done();
      });
    });

    it('throws validation error when fname is empty',function(done){
      var contact = new Contact({
        username: 'test',
        password: 'testpass',
        lname: 'tesi',
        email: 'tesi@tesi.si'
      });

      contact.save(function(error) {
        should.exist(error);
        error.errors.fname.message.should.equal('Path `fname` is required.');
        done();
      });
    });

    it('throws validation error when lname is empty',function(done){
      var contact = new Contact({
        username: 'test',
        password: 'testpass',
        fname: 'tesi',
        email: 'tesi@tesi.si'
      });

      contact.save(function(error) {
        should.exist(error);
        error.errors.lname.message.should.equal('Path `lname` is required.');
        done();
      });
    });

    it('throws validation error when email is empty',function(done){
      var contact = new Contact({
        username: 'test',
        password: 'testpass',
        fname: 'tesi',
        lname: 'tesi',
      });

      contact.save(function(error) {
        should.exist(error);
        // console.log(error);
        error.errors.email.message.should.equal('Path `email` is required.');
        done();
      });
    });

    it('throws validation error when email is not valid',function(done){
      var contact = new Contact({
        username: 'test',
        password: 'testpass',
        fname: 'tesi',
        lname: 'tesi',
        email:'tereza@'
      });

      contact.save(function(error) {
        should.exist(error);
        error.errors.email.message.should.equal('Email should be valid');
        done();
      });
    });

    it('throws validation error when username longer than 15 chars');
    it('throws validation error for username');

    /*it('throws validation error for username', function(done){
      var contact = new Contact({
        username:'test',
        password: 'testpass',
        fname: 'tesi',
        lname: 'tesi',
        email: 'test@tesi.si'
      });

      contact.save(function(error) {
        console.log(error);
        should.not.exist(error);
        error.error.indexOf('duplicate key error').should.not.equal(-1);
        // error.error.indexOf('$email').should.not.equal(-1);
        // error.error.indexOf('duplicate key error').should.not.equal(-1);
        // should.exist(error);
        done();
      });
    });*/

    /*it('delete contact by username', function(done) {
      Contact.remove({ username: 'test' }, function(err, contact) {
        done();
      });
    });*/

  });

});