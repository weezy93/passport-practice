function ensureAuthentication() {
  // check if user is authenticated
    // if no, redirect to login
    // if yes, call next()
    if ( req.user ){
      return next();
    } else {
      return res.redirect('/login');
    }
}

function loginRedirect() {
  // check if user is authenticated
    // if not, call next()
    // if yes, redirect to main route
  if(req.user){
    return res.redirect('/');
  } else {
    return next();
  }
}


module.exports = {
  ensureAuthentication: ensureAuthentication,
  loginRedirect: loginRedirect
};
