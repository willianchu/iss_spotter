// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files

// Call
nextISSTimesForMyLocation()
  .then((passTimes) => { //callback step 1 - receive the result
    printPassTimes(passTimes);
  }) // callback step 2 - print the result
  .catch((error) => { // added much later
    console.log("It didn't work: ", error.message);
  });

const printPassTimes = function(passTimes) { // generally it will be the codethat you alway have to write at this side receiving the result
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};