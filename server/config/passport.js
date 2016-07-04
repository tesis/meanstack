/**
 * config/passport.js
 * passport configuration file
 */

'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Account = require('../models/auth');

module.exports = function (app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());

  passport.deserializeUser(Account.deserializeUser());
}