const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  // Check if request has cookies
  // If cookies, middleware checks if valid - if session stored in database
  //assigns an object to a session property on the request that contains username and userId
  // If not valid - session not in database
  //then...

  //if request does not have cookies
  if (Object.keys(req.cookies).length === 0) {
    //create the session obj on the request
    req.session = {};
    req.session.hash = {};
    //create new session with unique hash
    models.Sessions.create()
      .then(hash => {
        console.log('REQUEST ' , req);
        console.log('HASH', hash);
        req.session = { 'hash': hash};
        res.cookie('shortlyid', req.session.hash);
      });
    //store ^ in the sessions database using hash and userId
    //.then(hash => models.Sessions.update({'hash': hash, 'userId': hash.insertId }));
    //set a new cookie in the response headers
    //^add it to response the server sends back after requests
    console.log('RESPONSE', res);
  }

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

