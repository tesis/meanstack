/**
 * api/auth.js
 *
 * handling authorization (login / register / logout)
 */

'use strict';

var mongoose = require('mongoose');

var passport = require('passport');
var Account = require('../models/auth');

// Send email
var nodemailer = require('nodemailer');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../../env.json')[process.env.NODE_ENV];

// TODO: confirm account, reset password
// https://github.com/deitch/activator
// activator.init(config);

// Logout
exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Logged out'
  });
};

// Login
exports.signin = function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    // if user, Log in with custom passport function
    req.logIn(user, function(err) {
      if (err) {
        return res.status(401).json('User with these credentials does not exist');
      }
      res.status(200).json({
        status: 'Login successful!',
        token: user.generateJWT()
      });

    });
  })(req, res, next);

};

// Registering new user
exports.signup = function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).json('Please fill out all fields');
  }
  var user = new Account({ username : req.body.username });

  Account.register(user, req.body.password, function(err) {

    if (err) {
      return res.status(401).json(err.message);
    }
    // Send confirmation email
    // -- sendEmail(req.body.username, req.body.email);

    // for automatic login implement passport.authentication
    //-- res.redirect('/');
    res.status(200).json({
      status: 'Register successful!',
    });
  });
};

var sendEmail = function(data){
  var smtpConfig = {
    host: config.emailHost,
    port: config.emailPort,
    secure: config.secu, // use SSL
    auth: {
      user: config.emailUser,
      pass: config.emailPassword
    }
  };

  // TODO: insert real options
  var transporter = nodemailer.createTransport(smtpConfig);
  var mailOptions = {
    from: 'tereza.simcic@gmail.com', // sender address
    to: 'tereza.simcic@gmail.com', // list of receivers
    subject: 'Test email', // Subject line
    text: 'this is some text', //, // plaintext body
    html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('Message not sent');
      return false;
    }
    else{
      console.log('Message sent: ' + info.response);
      return true;
    };
  });
}

