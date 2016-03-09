var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
// var logic = require('./logic.js');
var passport = require('../lib/auth');
var LocalStrategy = require('passport-local');
function Users(){
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stuff' });
});

router.get('/login', function(req, res, next) {
  // display form for email, password
  // logic.renderLoginPage(req, res);
  res.render('form', {
    title: "Login",
    action: '/login',
    method: 'post'
  });
});

router.post('/login', function(req, res, next) {
 passport.authenticate('local', function (err, user) {
   if (err) {
     return next(err);
   } else {
     req.logIn(user, function(err, user){
       if ( err ){
         return next(err);
       }
      return res.render('index', {
        title: "Welcome "+ req.user.email
      });
     });
   }
 })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.render('index', {
    title: 'Successfully logged out'
  });
});

router.get('/register', function(req, res, next) {
  // logic.renderRegisterPage(req, res);
  res.render('form', {
    title: "Register",
    action: '/register',
    method: 'post'
  });

});

router.post('/register', function(req, res, next) {
  Users().where('email', req.body.email).select()
  .then(function(result){
    if ( result.length ) {
      res.send('this email already exists');
    } else {
      Users().insert(req.body).then(function(){
        res.json(req.body);
      })
      .catch(function(error){
        console.log('error', error);
      });
    }
  });
});



  // Users().insert({
  //   email: req.body.email,
  //   password: req.body.password
  // }).returning('*')
  // .then(function(result) {
  //   var email= req.body.email;
  //   var password = req.body.password;
  //
  //   res.json({email: email, password: password});
  // });



module.exports = router;
