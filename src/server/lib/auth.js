var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex.js');
var helpers = require('./helpers');
function Users() {
  return knex('users');
}

// CONVERT TO KNEX
passport.use(new LocalStrategy({
  usernameField: 'email'
  },
function(email, password, done) {
    Users().where('email', email).select()
    .then(function(result) {
      if ( result.length === 0 ){
        return done(null, false, {message: 'Email does not exist'});
      } else {
          helpers.checkPassword(password, result[0].password)
          .then(function(){
            return done(null, result[0], {message: 'successful'});
          });
      }
    })
    .catch(function(error){
      done(error);
    });
  })
);

// sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  console.log('serializing', user);
    done(null, user.id);
});

// used on subsequent requests to update 'req.user' and update session
passport.deserializeUser(function(id, done) {
  // find user and return
  Users().where('id', id).select()
  .then(function(result){
    done(null, result[0]);
  })
  .catch(function(error){
    done(error);
  });
});

module.exports = passport;
