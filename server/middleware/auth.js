const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {


  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .tap(session => {
      if (!session) {
        throw session;
      }
    })
    // initializes a new session
    .catch(() => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({ id: results.insertId });
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then(session => {
      req.session = session;
      next();
    });
};



//********************** */


// console.log('COOKIES', req.cookies);


//   if (!req.cookies.shortlyid) {
//     //create new session with unique hash
//     models.Sessions.create()
//       .then(data => {
//         //retrieve the sessions data using the id
//         models.Sessions.get({ 'id': data.insertId })
//           //set req.session to what is returned in the get function
//           .then(record => {
//             req.session = record;
//             //set a new cookie in the response headers
//             res.cookie('shortlyid', req.session.hash);
//             //console.log('RES', res);
//             next();
//           });
//       }); // Check if request has shortlyid
//   } else {
//     models.Sessions.get({ 'hash': req.cookies.shortlyid })
//       .then(data => {
//         //console.log('DATA', data);
//         //if the session is valid - it's in the database
//         if (data) {
//           req.session = data;
//           //console.log(req.session);
//           next();
//           //if the session is not valid
//         } else {
//           //clears and reassigns a new cookie
//           res.clearCookie('shortlyid');
//           //create new session with unique hash
//           models.Sessions.create()
//             .then(data => {
//               //retrieve the sessions data using the id
//               models.Sessions.get({ 'id': data.insertId })
//                 //set req.session to what is returned in the get function
//                 .then(record => {
//                   req.session = record;
//                   //set a new cookie in the response headers
//                   res.cookie('shortlyid', req.session.hash);
//                   //console.log('RES', res);
//                   next();
//                 });
//             });
//         }
//       });
//   }
// };

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/





// VERIFY SESSION

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};
