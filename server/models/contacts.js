/**
 * contacts.js
 */

'use strict';

var mongoose = require('mongoose');

// Custom email validation
function validateEmail(email) {
  return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
}
// Add schema
var ContactsSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      sparse: true  ,
      required: true,
      trim: true,
      default:'',
    },
    fname: {
      type: String,
      sparse: true,
      required: true,
      trim: true,
      default:'',
    },
    lname: {
      type: String,
      sparse: true ,
      required: true,
      trim: true,
      default:'',
    },
    email: {
      type: String,
      sparse: true,
      required: true,
      trim: true,
      default:'',
      validate: [validateEmail, 'Email should be valid']
    },
    phone: {
      type:String,
      trim: true,
      default:'',
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
});

// Make this available in Node applications
module.exports = mongoose.model('Contacts', ContactsSchema, 'contacts');