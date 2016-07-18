/**
 * api/pages.js
 *
 * sections separated by folders
 */

'use strict';

var Pages = {
  index: function(req, res, next)  {
    res.render('index');
  },
  error: function(req, res, next) {
    res.render('error');
    var name = req.params.name;
  },
  partials: function (req, res) {
    var name = req.params.name;
    if(name === 'nav') {
      res.render('includes/' + name );
    }
    else{
      res.render('partials/' + name );
    }
  },
  auth: function (req, res) {
    var name = req.params.name;

    res.render('auth/' + name );
  },
  contacts: function (req, res) {
    var name = req.params.name;
    res.render('contacts/' + name );
  },
  test: function (req, res) {
    var name = req.params.name;
    console.log(req.params)
    if(req.params.id !== undefined){
      var id = req.params.id;
      console.log('id known')
      res.render('test/' + name + '/' + id );
    }
    else{
      console.log('id unknown')
      res.render('test/' + name  );
    }
  },
  tasks: function (req, res) {
    var name = req.params.name;

    res.render('tasks/' + name );
  },

};


module.exports = Pages;
