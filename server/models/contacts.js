/**
 * contacts.js
 */

'use strict';

var mongoose = require('mongoose');
//mongoose.set('debug', true);
mongoose.set('debug', function (collectionName, method, query, doc, options) {
  // console.log(__filename + ' mongoose DEBUG: ' );
  // console.log(collectionName);
  // console.log(query);
});

// Add schema
// unique username
// required all except phone and dates
var ContactsSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true  , required: true },
    fname: { type: String, sparse: true  },
    lname: { type: String, sparse: true , required: true },
    email: { type: String, sparse: true,  required: true,
      validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      }
    },
    phone: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

// Make this available in Node applications
module.exports = mongoose.model('Contacts', ContactsSchema, 'contacts');