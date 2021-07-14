// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data)
  console.log(data.features)

  
// earthquakeData[0] is an object, saving into variable 
  let earthquakeData = data.features
  console.log(earthquakeData[0])
  let firstFeature = earthquakeData[0]

// firstFeature has geometry and properties that we need

  console.log(firstFeature.properties)
  let propertiesData = firstFeature.properties
  console.log(propertiesData.mag)


  console.log(firstFeature.geometry)
  let geometryData = firstFeature.geometry
  console.log(geometryData.coordinates)
});

