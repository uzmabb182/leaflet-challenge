// A function to determine the marker size based on the population
function markerSize(population) {
  return Math.sqrt(population) * 50;
}

// Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Define arrays to hold the created city and state markers.
var cityMarkers = [];

d3.json(link).then(function (data) {
  console.log(data)
  var geojsonFeature = data.features
  console.log(geojsonFeature)

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the magnitude and place of the earthquake.
  // 'onEachFeature' function is used inside the 'createFeatures' fuction
  function onEachFeature(feature, layer) {
    //console.log(feature)
    layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Place: ${(feature.properties.place)}</p>`);
  }

  function generateColor(depth) {
    if (depth > 100) {
      return "#ea2c2c"
    }
    if (depth > 75) {
      return "#ea822c"
    }
    if (depth > 50) {
      return "#fbff00"    
    }
    if (depth > 25) {
      return "#72fa41"
    }
  }
  
  function generateStyle(feature) { 
    return {
      radius: 10,
      color: generateColor(feature.geometry.coordinates[2]),
      fillColor: generateColor(feature.geometry.coordinates[2]),
      opacity: 1
    }
  }

  // Create a GeoJSON layer that contains the features array on the geojsonFeature object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(data.features, {
    style: generateStyle,
    onEachFeature: onEachFeature, 
    pointToLayer: function(feature, latlong){
      return L.circleMarker(latlong)
    }
    
  });

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create two separate layer groups: one for the city markers and another for the state markers.

  // var cities = L.layerGroup(earthquakes);

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object.
  var overlayMaps = {

    "Earthquake Magnitude": earthquakes
  };

  // Define a map object.
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

})