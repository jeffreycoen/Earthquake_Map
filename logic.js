// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ";

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);



// Assembling API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
//baseURL + date + complaint + limit;

// Grabbing the data with d3..
d3.json(url, function(response) {
  console.log(response);

  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through our data...
  for (var i = 0; i < response.length; i++) {
    // set the data location property to a variable
    var location = response[i].features;
    console.log(location)

    // If the data has a location property...
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]])
        .bindPopup(response[i].properties.title));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});