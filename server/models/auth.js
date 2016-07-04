/**
 * auth.js
 *
 * handling accounts (users with privilege to log in)
 * https://github.com/auth0/node-jsonwebtoken
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

// Passport-Local Mongoose will add a username, hash
// and salt field to store the username, the hashed password
// and the salt value.
var passportLocalMongoose = require('passport-local-mongoose');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../env.json')[process.env.NODE_ENV];

// Add schema
var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

Account.methods.generateJWT = function() {

  // Set expiration to 1 day
  var exp = Math.floor(Date.now() / 1000) + 7200; //2h

  // Both the server and client will have access to the payload
  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: exp,
  }, config.secret);
};
// First param is singular, will look for collection in plural
module.exports = mongoose.model('Account', Account);