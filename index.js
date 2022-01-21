const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

let myIP = "";

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  myIP = ip;
  console.log('It worked! Returned IP:' , ip);
});


let latitude = "";
let longitude = "";

fetchCoordsByIP(myIP, (error, value) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  latitude = value.latitude;
  longitude = value.longitude;

  console.log('It worked! Returned coordinates:' , value);
});


const myCoords = { latitude, longitude };

fetchISSFlyOverTimes(myCoords, (error, value) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , value);
});



