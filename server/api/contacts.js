/**
 * api/contacts.js
 */

'use strict';

var mongoose = require('mongoose');
var contacts = require('../models/contacts.js');


exports.contactList = function(req, res, next) {
  contacts.find(function (err, docs) {
    if (err) {
      return res.status(401).json({
        err: err.message
      });
    }
    res.status(200).json(docs);
  }).sort({_id:-1});
}

exports.getContact = function(req, res) {
  var id = req.params.id;

  contacts.findById(id, function(err, docs){
    if (err) {
      return res.status(401).json({
        err: err.message
      });
    }

    res.status(200).json(docs);
  });
}

exports.saveContact = function(req, res) {
  var newRecord = new contacts(req.body);
  newRecord.save(function(err, doc){
    if (err) {
      return res.status(401).json({
        err: err.message
      });
    }
    res.status(200).json(docs);
  });
}
exports.updateContact = function(req, res) {
  var id = req.params.id;

  var conditions = {"_id": id};

  var update = req.body;
  var options = {new: true, upsert: true};
  contacts.findOneAndUpdate(conditions, update, options, function(err, ret) {
    if (err) {
      return res.status(401).json({
        err: err.message
      });
    }
    res.status(200).json(ret);
  });
}

exports.deleteContact = function(req, res) {
  var id = req.params.id;
  contacts.findById(id, function(err, contact) {
    if (err) {
      return res.status(401).json({
        err: err.message
      });
    }

    // delete the record
    contact.remove(function(err) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }

      res.send('Record successfully deleted!');
    });
  });
}


