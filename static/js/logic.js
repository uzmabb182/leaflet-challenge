//=====================================================================================================================
// Level 1: Import & Visualize the Data
// "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data.
//=====================================================================================================================

// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

// HINT: The depth of the earth can be found as the third coordinate for each earthquake.

// Include popups that provide additional information about the earthquake when a marker is clicked.

// Create a legend that will provide context for your map data.

//=====================================================================================================================
//===================================================================================================================
// Level 2: The USGS wants you to plot a second data set on your map to illustrate the relationship 
//between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it 
//alongside your original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
//=====================================================================================================================

// In this step, you will:

// Plot a second data set on our map.

// Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

// Add layer controls to our map.
//=====================================================================================================================

// Use this link to get the GeoJSON earthquakes data.
var link1 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Use this link to get the GeoJSON tectonic plates data.
var link2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"


d3.json(link1).then(function (data) {
  console.log(data)
  console.log(data.features)

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the magnitude and place of the earthquake.

  function onEachFeature(feature, layer) {
    // console.log(feature)
    //console.log(feature.properties.mag)
    // console.log(feature.geometry.coordinates[2])
    layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h3>Depth: ${feature.geometry.coordinates[2]}</h3><hr><p>Location: ${(feature.properties.place)}</p>`);
  }

  // A function to generate color based on depth
  function generateColor(depth) {
    if (depth > 10) {
      return "#ea2c2c"
    }
    if (depth > .75) {
      return "#ea822c"
    }
    if (depth > .50) {
      return "#fbff00"    
    }
    if (depth > .25) {
      return "#72fa41"
    }
    else {
      return "#800080"
    }
  }


  // A function to determine the marker size based on the magnitude
function markerSize(magnitude) {
  return Math.sqrt(magnitude) * 10;
}

 // Assigning the style by calling function based on requirement
  function generateStyle(feature) { 
    return {
      radius: markerSize(feature.properties.mag),
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

  // Create a separate layer group for magnitude


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

})//d3-link1

//---------------------------------------------------------------------------------------------------------------------------------
d3.json(link2).then(function (data) {
  console.log(data)
  console.log(data.features)
})

