/**
 * api/contacts.js
 * quering db
 */

'use strict';

var mongoose = require('mongoose');
var contacts = require('../models/contacts.js');

var Contact = {
  contactList: function(req, res, next) {
    if(req.params.skip === 'undefined'){
      req.params.skip = 0;
    }
    var query = contacts.find({});
    var counts = query.count(function(err, count){
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }
      // console.log(count);
      query.limit(req.params.limit).skip(req.params.skip).sort({_id: -1}).exec('find', function (err, docs) {
        if (err) {
          return res.status(401).json({
            err: err.message
          });
        }
        // console.log(count);
        return res.status(200).json({docs:docs, count:count});
      });
    });
  },

  getContact: function(req, res) {
    var id = req.params.id;
    // if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //   console.log('ID OK: ' + id)
    // }
      // console.log('ID : ' + id)
    contacts.findById(id, function(err, doc) {
      if (err) {
        return res.status(401).json(err.message);
      }

      res.status(200).json(doc);
    });
  },

  findUsername: function(req, res) {
    var username = req.params.username;

    contacts.findOne({username: username}, function(err, docs) {
      if (err) {
        return res.status(401).json(err.message);
      }

      res.status(200).json(docs);
    });
  },
  // Search by keyword several fields, case sensitive
  searchUsername: function(req, res) {
    var keyword = req.params.keyword;
    var query = contacts.find(
      {
        //username: { $regex : keyword, $options: 'i' },
        $or: [
                {username: { $regex : keyword, $options: 'i' }},
                {fname: { $regex : keyword, $options: 'i' }},
                {lname: { $regex : keyword, $options: 'i' }},
                {email: { $regex : keyword, $options: 'i' }}
             ]
      },
      {username:1, email:1}

    );
    query.limit(5).sort({_id: -1}).exec('find', function (err, docs) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }
      // console.log(count);
      res.status(200).json({docs:docs});
    });

  },

  findEmail: function(req, res) {
    var email = req.params.email;

    contacts.findOne({email: email}, function(err, docs) {
      if (err) {
        return res.status(401).json(err.message);
      }

      res.status(200).json(docs);
    });
  },


  saveContact: function(req, res) {
    var newRecord = new contacts({username: req.body.username, phone: req.body.phone, email: req.body.email, fname: req.body.fname, lname: req.body.lname});

    newRecord.save(function(err, doc){
      if (err) {
        return res.status(401).json('Please fill all the required fields');
      }
      res.status(200).json(doc);
    });
  },

  updateContact: function(req, res) {
    var id = req.params.id;

    var conditions = {"_id": id};

    // var update = req.body;
    // console.log(req.body.lname);
    // TODO: add date today for update - compatible with the schema
    var update = {$set: { _id: id, username: req.body.username, phone: req.body.phone, email: req.body.email, fname: req.body.fname, lname: req.body.lname}};
    var options = {new: true, upsert: true};
    contacts.findOneAndUpdate(conditions, update, options, function(err, doc) {
      if (err) {
        return res.status(401).json(err.message);
      }
      res.status(200).json(doc);
    });
  },

  deleteContact: function(req, res) {
    var id = req.params.id;
    contacts.findById(id, function(err, contact) {
      if (err) {
        return res.status(401).json(err.message);
      }

      // delete the record
      contact.remove(function(err) {
        if (err) {
          return res.status(401).json(err.message);
        }

        res.send('Record successfully deleted!');
      });
    });
  }
  /*------------ end obj -----------------------*/
}

module.exports = Contact;

