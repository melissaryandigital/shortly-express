const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  // Check if request has cookies
  if (Object.keys(req.cookies).length > 0) {
    // If cookies, middleware checks if valid - if session stored in database
    //assigns an object to a session property on the request that contains username and userId

    //console.log('REQ.COOKIES.SHORTLY', req.cookies.shortlyid);

    return models.Sessions.get({ 'hash': req.cookies.shortlyid })
      .then(data => {
        console.log('DATA', data);
        req.session = data;
        console.log(req.session);
        next();
      })
      // if session is invalid
      //clears and reassigns a new cookie
      .catch(() => {
        res.clearCookie('shortlyid');
        //possibly reassign the cookie?
        next();
      });

    //else - request does not have cookies
  } else {
    //create new session with unique hash
    models.Sessions.create()
      .then(data => {
        //retrieve the sessions data using the id
        models.Sessions.get({ 'id': data.insertId })
          //set req.session to what is returned in the get function
          .then(record => {
            req.session = { 'hash': record.hash };
            //set a new cookie in the response headers
            res.cookie('shortlyid', req.session.hash);
            //console.log('RES', res);
            next();
          });
      });
  }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

