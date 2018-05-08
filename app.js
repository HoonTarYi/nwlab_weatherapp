const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
.options('address')
.argv;

const addr =argv.address;
// Input for address

const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCXxsiK79-DXha-afMjHuLwohgNaSmRpXY`;

axios.get(locationReq).then((response) => {
  console.log(response.data.results[0].formatted_address);
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherReq = `https://api.darksky.net/forecast/4be9201a44e188acef99b90d2e98f256/${lat},${lng}`;

  return axios.get(weatherReq);

// return the data
}) .then((response) =>  {
    console.log("Summary: ",response.data.currently.summary);
    const temp = (response.data.currently.temperature - 32) * 0.5556;
    const temperature = temp.toFixed(2);
    // Fix 2Decimal place
    console.log(`${temperature} Celsius`);
})
.catch((error) => {
  console.log(error.code);
});
