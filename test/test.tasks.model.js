'use strict';

/**
 * Module dependencies.
 */
var should = require("should");
var mongoose = require('mongoose');

// var Task = mongoose.model('Tasks');


'use strict';

var should = require("should");
var mongoose = require('mongoose');
var Task = require("../server/models/tasks.js");
var Contact = require("../server/models/contacts.js");
var db;
/**
 * Unit tests
 */

/*describe('task', function() {

  before(function(done) {
    db = mongoose.connect('mongodb://localhost/localapp');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });



  it('find tasks by user', function(done) {
    // find tasks by user
    var userId = "57737b11e3b89461287cc5a3";

    Task.find({userId:userId}, function(err, docs) {
      if (err) {
        console.log('Error')
      }
      docs.should.not.eql(0);
      docs.length.should.be.above(1);
      console.log('Num of tasks for this user: ' + docs.length)
      if(docs.length){
        //for each doc find casework name
        //for each doc find contact name
        docs.forEach(function(doc) {
          // if(doc != null){
            //console.log('First Name: ' + doc.userId);
            // var c = 'ObjectId(' + doc.contactId + ')';
            var c =  doc.contactId ;
            Contact.findById(c, function(err, aaa) {
              console.log(err);
            });
          // }
        });
      }
      done();

    });//.sort({_id:-1});

  });

});*/