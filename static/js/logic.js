// Step_1: Creating the map object
//================================
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Step_2: Adding the tile layer
//================================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Step_3: Getting our GeoJSON data
//==================================
// Use this link to get the GeoJSON data.

d3.json(link).then(function(data) {

// Once we get a response, send the data.features to console
  console.log(data)
  console.log(data.features)

  let earthquakeData = data.features

// Defining arrays that will store the coordinate, and magnitude data for markers

var magnitudeMarkers = [];
var coordinatesMarkers = [];

// Looping to create an array of coordinate makers
for (var i = 0; i < earthquakeData.length; i++) {
  let propertiesData = earthquakeData[i].properties
  magnitudeMarkers.push(propertiesData.mag
  );
}

console.log(magnitudeMarkers)

// Looping to create an array of magnitude makers
for (var i = 0; i < earthquakeData.length; i++) {
  let geometryData = earthquakeData[i].geometry
  coordinatesMarkers.push(geometryData.coordinates
  );
}

console.log(coordinatesMarkers)



  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap);
});

