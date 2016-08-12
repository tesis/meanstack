/**
 * api/users.js
 *
 * handling users and tasks
 */

'use strict';

var mongoose = require('mongoose');
var tasks = require('../models/tasks');
var email = require('../util/email');

var TaskObj = {
  taskList: function(req, res, next) {
    var query = tasks.find({});
    var counts = query.count(function(err, count){
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }
      // console.log(count);
      query.limit(10).sort({_id: -1}).exec('find', function (err, docs) {
        if (err) {
          return res.status(401).json({
            err: err.message
          });
        }
        // console.log(count);
        res.status(200).json({docs:docs, count:count});
      });
    });
  },

  taskListByUser: function(req, res, next) {
    console.log('list user')
    var userId = req.params.userId;
    if(req.params.skip === 'undefined'){
      req.params.skip = 0;
    }
    var query = tasks.find({userId:userId});
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
        res.status(200).json({docs:docs, count:count});
      });
    });
  },

  taskListByContact: function(req, res, next) {
    var contactId = req.params.contactId;
    var query = tasks.find({contactId:contactId});
    var counts = query.count(function(err, count){
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }
      // console.log(count);
      query.limit(5).sort({_id: -1}).exec('find', function (err, docs) {
        if (err) {
          return res.status(401).json({
            err: err.message
          });
        }

        // console.log(count);
        res.status(200).json({docs:docs, count:count});
      });
    });
  },

  taskListByContactLim: function(req, res, next) {
    var contactId = req.params.contactId;
    var query = tasks.find({contactId:contactId});
    var counts = query.count(function(err, count){
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }
      // console.log(count);
      query.skip(req.params.skip).limit(req.params.limit).sort({_id: -1}).exec('find', function (err, docs) {
        if (err) {
          return res.status(401).json({
            err: err.message
          });
        }
        var users = [];
        // Useless to search each user, as users might be duplicated
        // Perform search after
        docs.forEach(function(doc){
          if(users.indexOf(doc.userId) === -1){
            users.push(doc.userId)
          }
        });
        // getData(docs, count);
        res.status(200).json({docs:docs, count:count, users:users});
      });
    });
  },

  // TODO
  taskListByCasework: function(req, res, next) {
    var caseworkId = req.params.caseworkId;

    tasks.find({caseworkId:caseworkId}, function(err, docs) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }

      res.status(200).json(docs);
    }).sort({_id:-1});
  },

  getTask: function(req, res) {
    var id = req.params.id;

    tasks.findById(id, function(err, docs) {
      if (err) {
        return res.status(401).json({
          err: err.message
        });
      }

      res.status(200).json(docs);
    });
  },

  save: function(req, res) {
    var newRecord = new tasks({ userId: req.body.userId, contactId: req.body.contactId, caseworkId: req.body.caseworkId, title: req.body.title, details: req.body.details, taskStatus: req.body.taskStatus, dueDate:req.body.dueDate, completed:req.body.completed});

    newRecord.save(function(err, doc){
      if (err) {
        return res.status(401).json('Please fill all the required fields');
      }
      if(req.body.sendEmail === true){
        var data = {
          toEmail: req.body.contactEmail,
          subject: req.body.title,
          message: req.body.details,
        };
        email.newTask(data);
      }
      res.status(200).json(doc);
    });
  },

  update: function(req, res) {
    var id = req.params.id;

    var conditions = {"_id": id};
    var update = {$set: { _id: id, userId: req.body.userId, contactId: req.body.contactId, caseworkId: req.body.caseworkId, title: req.body.title, details: req.body.details, taskStatus: req.body.taskStatus, dueDate:req.body.dueDate, completed:req.body.completed}};
    var options = {new: true, upsert: true};
    tasks.findOneAndUpdate(conditions, update, options, function(err, doc) {
      if (err) {
        return res.status(401).json(err.message);
      }
      res.status(200).json(doc);
    });
  },

  delete: function(req, res) {
    console.log('delete')
    var id = req.params.id;
    tasks.findById(id, function(err, task) {
      if (err) {
        return res.status(401).json(err.message);
      }

      // delete the record
      task.remove(function(err) {
        if (err) {
          return res.status(401).json(err.message);
        }
        res.send('Record successfully deleted!');
      });
    });
  },

}


module.exports = TaskObj;