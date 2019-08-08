const express = require('express');
const app = express();

// will be used in the future for
// controlling who can access our API
const cors = require('cors');

// doesnt help yet but will hold project
// specific env vars in the future
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// currently anyone can access our API
app.use(cors());

app.get('/location', (request, response) => {
    // get location data from geo.json file
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
});

app.get('/weather', (request, response) => {
    //get weather data from darksky.json file
    const weatherData = searchForWeather();
    response.send(weatherData);
});

function searchForWeather() {
    const darkskyData = require('./data/darksky.json');
    var wdata = [];
    darkskyData.daily.data.forEach(element => {
        wdata.push(new Weather(element));
    });
    return wdata;
}

function searchToLatLong(query) {
    const geoData = require('./data/geo.json');
    const location = new GetLocation(geoData.results[0]);
    location.search_query = query;
    return location;
}

function GetLocation(data) {
    this.formatted_query = data.formatted_address;
    this.latitude = data.geometry.location.lat;
    this.longitude = data.geometry.location.lng;
}

function Weather(data) {
    this.forecast = data.summary;
    this.time = data.time;
}


app.listen(PORT, () => {
    console.log('Lab06 assignment');
    console.log(`Listening on the port: ${PORT}`);
});