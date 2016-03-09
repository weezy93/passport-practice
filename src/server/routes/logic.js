var pg = require('pg');
var knex = require('../../../db/knex');
function Users() {
  return knex('users');
}

function renderLoginPage(req, res) {
  res.render('form', {
    title: "Login",
    action: '/login',
    method: 'post'
  });
}

function renderRegisterPage(req, res) {
  res.render('form', {
    title: "Register",
    action: '/register',
    method: 'post'
  });
}

function createUser(req, res) {
    Users().insert({
      email: req.body.email,
      password: req.body.password
    }).returning('*')
    .then(function(result) {
      res.json(req.body);
    });
}


module.exports = {
  renderLoginPage: renderLoginPage,
  renderRegisterPage: renderRegisterPage,
  createUser: createUser
};
