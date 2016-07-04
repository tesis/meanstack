/**
 * routes.js
 */

'use strict';

// Export to app
module.exports = function (app) {

  var self = {};

  // Serve JSON to our AngularJS client
  var api = require('../api');
  var auth = require('../api/auth');
  var contacts = require('../api/contacts');

  // Serve index and partials
  self.index = function(req, res, next){
    res.render('index');
  };
  // Error handler on reload
  self.error = function(req, res, next){
    res.render('error');
  };
  // for general pages
  self.partials = function (req, res) {
    var name = req.params.name;
    if(name === 'nav'){
      res.render('includes/' + name );
    }
    else{
      res.render('partials/' + name );
    }
  };
  // for auth: login / register
  self.auth = function (req, res) {
    var name = req.params.name;

    res.render('auth/' + name );
  };
  // for contacts
  self.contacts = function (req, res) {
    var name = req.params.name;

    res.render('contacts/' + name );
  };
  // for tasks
  self.tasks = function (req, res) {
    var name = req.params.name;

    res.render('tasks/' + name );
  };

  // for test - always executed
  /*app.use(function(req, res, next) {

    // log each request to the console
    console.log("TEST: m:" + req.method + ' url:' +  req.url + ' name: ' + req.params.name);
    // console.log(res);

    // continue doing what we were doing and go to the route
    next();
  }); */
  // Serve index and view partials
  app.get('/', self.index);
  app.get('/partials/:name', self.partials);
  app.get('/auth/:name', self.auth);
  app.get('/contacts/:name', self.contacts);
  app.get('/tasks/:name', self.tasks);
  // Auth
  app.get('/api/logout', auth.logout);
  app.post('/api/signin', auth.signin);
  app.post('/api/signup', auth.signup);

  app.get('/error', self.error);

  // Contacts
  app.get('/api/contactList', contacts.contactList);
  app.get('/api/contactList/:id', contacts.getContact);
  app.post('/api/contactList', contacts.saveContact);
  app.put('/api/contactList/:id', contacts.updateContact);
  app.delete('/api/contactList/:id', contacts.deleteContact);

 // // activate a user - TODO
 //  app.post("/user",activator.createActivate);
 //  app.put("/user/:user/active",activator.completeActivate);

 //  // reset a password
 //  app.post("/passwordreset",activator.createPasswordReset);
 //  app.put("/passwordreset/:user",activator.completePasswordReset);

  // redirect all others to the index (HTML5 history)
  app.get('*', self.index);

};