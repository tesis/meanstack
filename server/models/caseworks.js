/**
 * caseworks.js
 */

'use strict';

var mongoose = require('mongoose');

// Add schema
var CaseworksSchema = new mongoose.Schema({
  userId:{ type: String, required: true },
  contactId:{ type: String, required: true },
  problem:{ type: String, required: true },
  description:{ type: String, required: true },
  initialResponse:{ type: String, required: true },
  created: { type: Date, default: Date.now },
  closed: { type: Date, default: Date.now },
  status: { type: String, default: '-1' },
  feedback: { type: String, default: '0' }

});

// Make this available in Node applications
module.exports = mongoose.model('Caseworks', CaseworksSchema, 'caseworks');