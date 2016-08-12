/**
 * routes.js
 */

'use strict';

var api = require('../api');
var contacts = require('../api/contacts');
var users = require('../api/users');
var tasks = require('../api/tasks');
var pages = require('../api/pages');


// Manage routes

module.exports = function (app) {

  // Serve index and view partials
  app.get('/', pages.index);
  app.get('/partials/:name', pages.partials);

  app.get('/users/:name', pages.users);

  app.get('/contacts/:name', pages.contacts);
  app.get('/tasks/:name', pages.tasks);

  app.get('/error', pages.error);

  // Contacts
  app.get('/api/contactList/:limit/:skip?', contacts.contactList);
  app.get('/api/contacts/:id', contacts.getContact);
  app.get('/api/getUsernameContact/:username', contacts.findUsername);
  app.get('/api/searchContacts/:keyword', contacts.searchUsername);
  app.get('/api/getEmailContact/:email', contacts.findEmail);
  app.post('/api/contactList', contacts.saveContact);
  app.put('/api/contactList/:id', contacts.updateContact);
  app.delete('/api/contactList/:id', contacts.deleteContact);


  //Users
  app.get('/api/userList', users.userList);
  app.get('/api/userList/:id', users.getUser);

  // Auth - move to users
  app.get('/api/logout', users.logout);
  app.post('/api/signin', users.signin);
  app.post('/api/signup', users.signup);
  app.get('/api/checkUsernameAuth/:username', users.findUsername);
  app.get('/api/checkEmailAuth/:email', users.findEmail);
  app.put('/api/user/:id', users.update);

  app.get('/api/activate/:base64', users.activateAccount);
  app.get('/api/requestReset/:email', users.requestReset);
  app.get('/api/resetPassword/:base64', users.resetPassword);
  // TODO
  app.delete('/api/user/:id', users.delete);

  //Tasks
  app.get('/api/taskList/:userId/user/:limit/:skip?', tasks.taskListByUser);
  app.get('/api/taskList/:contactId/contact', tasks.taskListByContact);
  app.get('/api/taskList/:contactId/contact/:limit/:skip?', tasks.taskListByContactLim);
  app.get('/api/taskList/:caseworkId/casework', tasks.taskListByCasework);
  // CRUD for tasks
  app.get('/api/taskList/:id', tasks.getTask);
  app.post('/api/taskList', tasks.save);
  app.put('/api/taskList/:id', tasks.update);
  app.delete('/api/taskList/:id', tasks.delete);


  // At last redirect all others to the index (HTML5 history)
  app.get('*', pages.index);

};