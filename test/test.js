// test.js
// make test

var supertest = require("supertest");
var should = require("should");
var expect = require("expect");


var mongoose = require('mongoose');
var test = require("../server/api/test.js");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // console.log(res);
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      //res.body.error.should.equal(false);
      done();
    });
  });

});

