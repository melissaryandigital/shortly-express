const parseCookies = (req, res, next) => {

  // Look at the request object
  // Parse this into an object
  // Assign the new object to a cookies property on the request

  //request.headers -> {}
  //req.headers.cookie -> undefined

  // Take request and add additional property 'cookies', then set to req.header.cookie

  //shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66;
  // req.cookies = {'shortlyid:' '18ea4fb6ab3178092ce936c591ddbb90c99c9f66'}

  var cookieString = req.headers;

  //if the header is not empty
  if (Object.keys(cookieString).length) {
    var stringArray = cookieString.cookie.split('; ');

    req.headers.cookies = {};

    var parsedCookies = stringArray.map((cookie) => {
      //find the index of the equal sign
      var equalIndex = cookie.indexOf('=');
      //create key up to equal sign
      var key = cookie.slice(0, equalIndex);
      //create value after equal sign
      var value = cookie.slice(equalIndex + 1);
      //add to object
      req.headers.cookies[key] = value;
    });

  } else {
    req.headers.cookies = {};
  }

};

module.exports = parseCookies;