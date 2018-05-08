const express = require('express');
const server = express();
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded( {extended: true } ));
server.set('view engine','hbs');
hbs.registerPartials(__dirname +  '/views/partials');

server.get("/",(req,res) => {
  res.render('main.hbs');
});

server.post('/getweather', (req,res) => {
  //  run hmtl in another file
  const addr = req.body.address;
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCXxsiK79-DXha-afMjHuLwohgNaSmRpXY`;

  axios.get(locationReq).then((response) => {
    console.log(response.data.results[0].formatted_address);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherReq = `https://api.darksky.net/forecast/4be9201a44e188acef99b90d2e98f256/${lat},${lng}`;

    return axios.get(weatherReq);

  // return the data
  }) .then((response) =>  {
    res.send(
      {
        address: addr,
        summary:response.data.currently.summary,
        temperature:(response.data.currently.temperature - 32) * 0.5556,
      }
    );

      console.log("Summary: ",response.data.currently.summary);
      const temp = (response.data.currently.temperature - 32) * 0.5556;
      const temperature = temp.toFixed(2);
      // Fix 2Decimal place
      console.log(`${temperature} Celsius`);
  }
)

.catch((error) => {
  console.log(error.code);
});
});


server.get('/form', (req,res) => {

  res.render('form.hbs');


});

server.listen(3000, () => {
  console.log("Server Listening on port 3000")
});
