const request = require('request');  // step 1 start requiring
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// step 2 design the function sockets // step 3 implement the function
const fetchMyIP = function(callback) { // request URL endpoint
  request('https://api.ipify.org?format=json', function(error, response, body) {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null); // ## =<^;^>= ##
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //console.log("IP:",body); // Case everything is ok!
    //console.log(typeof body);
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  }); // end of request
}; // end of fetchMyIP



const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null); // ## =<^;^>= ## ??
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    
    callback(null, { latitude, longitude });
    // stop the function from running
    return;
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    // callback ...error 
    if (error) {
      callback(error, null); // ## =<^;^>= ## ??
      return;
    }
    if (response.statusCode !== 200) { //  server error
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times for coordinates: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
    return flyOverTimes;

  });
};

const nextISSTimesForMyLocation = (callback) => { // step 5 chain the 

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    // console.log('It worked! Returned IP:' , ip);
    return fetchCoordsByIP(ip, (error, myCoords) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      // console.log('It worked! Returned coordinates:' , myCoords);
      return fetchISSFlyOverTimes(myCoords, (error, value) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
        // console.log('It worked! Returned flyover times:' , value);
        return callback(null, value);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */