//=====================================================================================================================
// Level 1: Import & Visualize the Data
// "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data.
//=====================================================================================================================

// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

// HINT: The depth of the earth can be found as the third coordinate for each earthquake.

// Include popups that provide additional information about the earthquake when a marker is clicked.

// Create a legend that will provide context for your map data.

//===================================================================================================================
// Level 2: The USGS wants you to plot a second data set on your map to illustrate the relationship 
//between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it 
//alongside your original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
//=====================================================================================================================

// In this step, you will:

// Plot a second data set on our map.

// Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

// Add layer controls to our map.
//===================================================================================================

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Store our API endpoint as queryUrl.
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// An API call: Perform a GET request to the query URL/
d3.json(link).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data)
  // console.log(data.features)
  var geojsonFeature = data.features
  console.log(geojsonFeature)

  console.log(geojsonFeature[0].properties.mag)
  console.log(geojsonFeature[1].properties.mag)
  console.log(geojsonFeature[0].geometry.coordinates[0])
  console.log(geojsonFeature[0].geometry.coordinates[1])
  console.log(geojsonFeature[0].geometry.coordinates[2])

  createFeatures(geojsonFeature); // calling function

});//d3

//------------------------------------------------------
function createFeatures(geojsonFeature) {
  
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the magnitude and place of the earthquake.
  // 'onEachFeature' function is used inside the 'createFeatures' fuction
  function onEachFeature(feature, layer) {
    //console.log(feature)
    layer.bindPopup(`<h3>${feature.properties.mag}</h3><hr><p>${(feature.properties.place)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the geojsonFeature object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

//--------------------------------------------------------

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
