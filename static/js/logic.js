var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Store our API endpoint as queryUrl.
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL/
d3.json(link).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data)
  createFeatures(data.features); // calling function 
});

//===============================================================================================================
//defining function (passing (data.features) to 'earthquakeData' in createFeatures function)
//===============================================================================================================
function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>  Magnitude: ${feature.properties.mag}</h3><hr><p>${feature.properties.place}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature // calling function 
    });

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes); // calling function
}

//=================================================================================================================
//defining function
//=================================================================================================================
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


//==================================================
// Looping to access magnitude and place data
// for (var i = 0; i < earthquakeData.length; i++) {
//     let propertiesData = earthquakeData[i].properties
    // console.log(propertiesData)
    // console.log(propertiesData.mag)
    // console.log(propertiesData.place)
    // add a marker
  
// }


// Looping to access coordinate and depth data
// for (var i = 0; i < earthquakeData.length; i++) {
//   let geometryData = earthquakeData[i].geometry
    // console.log(geometryData)
    // console.log(geometryData.coordinates)
    // console.log(geometryData.coordinates[1])
    // console.log(geometryData.coordinates[0])
    // console.log(geometryData.coordinates[2])
    

// }


