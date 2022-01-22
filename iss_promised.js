const request = require('request-promise-native');

const fetchMyIP = function() { // step 1 start requiring
  return request('https://api.ipify.org?format=json'); //step 1.1 end requiring
}; // the returning value will be the argument of the next function

const fetchCoordsByIP = function(body) { //step 1
  const ip = JSON.parse(body).ip; //step 1.1 parse the body entry
  return request(`https://freegeoip.app/json/${ip}`); //step 1.2 end requiring
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body); // =<^;^>= everything that I find cute to remember
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


const nextISSTimesForMyLocation = function() { // Last Step Chaining functions
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => { // Inserting the data into the next callback
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };