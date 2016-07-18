/**
 * api/users.js
 *
 * handling users and tasks
 */

'use strict';

var mongoose = require('mongoose');
var user = require('../models/auth');

var UserObj = {
  userList: function(req, res, next) {
    user.find({},{username:1}, function(err, docs) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }

      res.status(200).json(docs);
    }).sort({_id:-1});
  },

  getUser: function(req, res) {
    var id = req.params.id;

    accounts.findById(id, function(err, docs) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }

      res.status(200).json(docs);
    });
  },
}

module.exports = UserObj;