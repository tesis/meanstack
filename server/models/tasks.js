/**
 * tasks.js
 */

'use strict';

var mongoose = require('mongoose');


// Add schema
var TasksSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  contactId:{
    type: String,
    required: true
  },
  caseworkId:{
    type: String,
 },
  title:{
    type: String,
    required: true ,
    trim:true
  },
  details:{
    type: String,
    required: true,
    trim:true
  },
  //completed/uncompleted
  taskStatus:{
    type: String,
    default:'uncompleted'
  },
  created: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Date,
    default: null
  }

});

// Make this available in Node applications
module.exports = mongoose.model('Tasks', TasksSchema, 'tasks');