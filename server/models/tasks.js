/**
 * tasks.js
 */

'use strict';

var mongoose = require('mongoose');


// Add schema
var TasksSchema = new mongoose.Schema({
  userId:{ type: String, required: true },
  contactId:{ type: String, required: true },
  caseworkId:{ type: String, required: true },
  title:{ type: String, required: true },
  details:{ type: String, required: true },
  taskStatus:{ type: String, default:'uncompleted' },//completed/uncompleted
  created: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now },
  completed: { type: Date, default: Date.now }

});

// Make this available in Node applications
module.exports = mongoose.model('Tasks', TasksSchema, 'tasks');