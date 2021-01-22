module.exports.parseCookies = (req, res, next) => {

  // Look at the request object
  // Parse this into an object
  // Assign the new object to a cookies property on the request

  //request.headers -> {}
  //req.headers.cookie -> undefined

  // Take request and add additional property 'cookies', then set to req.header.cookie

  //shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66;
  // req.cookies = {'shortlyid:' '18ea4fb6ab3178092ce936c591ddbb90c99c9f66'}

  var cookieString = req.headers;

  //console.log('COOKIESTRING', cookieString);
  //if the header is not empty
  if (Object.keys(cookieString).length) {
    //convert the cookieString.cookie to an array
    var stringArray = cookieString.cookie.split('; ');

    req.cookies = {};
    //console.log('STRINGARRAY', stringArray);

    //iterate over the string array and add each item to the req.body.cookies object
    for (var i = 0; i < stringArray.length; i++) {
      //find the index of the equal sign
      var equalIndex = stringArray[i].indexOf('=');
      //create key up to equal sign
      var key = stringArray[i].slice(0, equalIndex);
      //create value after equal sign
      var value = stringArray[i].slice(equalIndex + 1);
      //add to object
      req.cookies[key] = value;
    }
  } else {
    req.cookies = {};
  }

  next();
};

//module.exports = parseCookies;