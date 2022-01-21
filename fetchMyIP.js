const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(/*callback*/) { // request URL endpoint
  request('https://api.ipify.org/?format=json%27', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("IP:",body);
      console.log(typeof body);
      //callback(null, body);
    } else {
      console.log('Error: getaddrinfo EAI_AGAIN api.ipify.org');
      //callback(error, 'Error: getaddrinfo EAI_AGAIN api.ipify.org'); // error, desc
    }
  });
};

fetchMyIP();
module.exports = { fetchMyIP };
