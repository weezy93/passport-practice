var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var logic = require('/logic');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stuff' });
});

router.get('/login', function(req, res, next) {
  // display form for email, password
  logic.renderLoginPage(req, res);
});

router.post('/login', function(req, res, next) {
  logic.createUser(req, res);
});

router.get('/logout', function(req, res, next) {
  res.render('index', {
    title: 'Successfully logged out'
  });
});

router.get('/register', function(req, res, next) {
  logic.renderRegisterPage(req, res);
});

router.post('/register', function(req, res, next) {
  logic.createUser(req, res);
});


module.exports = router;
