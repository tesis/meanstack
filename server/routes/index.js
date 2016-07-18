/**
 * routes.js
 */

'use strict';

var api = require('../api');
var auth = require('../api/auth');
var contacts = require('../api/contacts');
var users = require('../api/users');
var tasks = require('../api/tasks');
var pages = require('../api/pages');


// Manage routes

module.exports = function (app) {

  // Serve index and view partials
  app.get('/', pages.index);
  app.get('/partials/:name', pages.partials);
  app.get('/auth/:name', pages.auth);
  app.get('/contacts/:name', pages.contacts);
  app.get('/tasks/:name', pages.tasks);
  app.get('/test/:name', pages.test);
  app.get('/test/:name/:id', pages.test);

  // Auth
  app.get('/api/logout', auth.logout);
  app.post('/api/signin', auth.signin);
  app.post('/api/signup', auth.signup);
  app.get('/api/checkUsernameAuth/:username', auth.findUsername);
  app.get('/api/checkEmailAuth/:email', auth.findEmail);

  app.get('/api/test', auth.test);
  app.get('/api/test/testId', auth.testId);

  app.get('/error', pages.error);

  // Contacts
  app.get('/api/contactList/:limit/:skip?', contacts.contactList);
  // app.get('/api/contactList/:id', contacts.getContact);
  app.get('/api/contacts/:id', contacts.getContact);
  app.get('/api/checkUsernameContact/:username', contacts.findUsername);
  app.get('/api/checkEmailContact/:email', contacts.findEmail);
  app.post('/api/contactList', contacts.saveContact);
  app.put('/api/contactList/:id', contacts.updateContact);
  app.delete('/api/contactList/:id', contacts.deleteContact);


  //Users
  app.get('/api/userList', users.userList);
  app.get('/api/userList/:id', users.getUser);

  //Tasks
  app.get('/api/taskList/:userId/user/:limit/:skip?', tasks.taskListByUser);
  app.get('/api/taskList/:contactId/contact', tasks.taskListByContact);
  app.get('/api/taskList/:contactId/contact/:limit/:skip?', tasks.taskListByContactLim);
  app.get('/api/taskList/:caseworkId/casework', tasks.taskListByCasework);
  app.put('/api/taskList/:id', tasks.update);

 // activate a user - TODO

  app.get('*', pages.index);

};