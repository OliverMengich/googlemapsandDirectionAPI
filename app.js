
// set the map options
let map;
let directionsService;
let directionsRenderer;
function initMap() {

    // var mapOptions = {
    //     center:  {lat:0.4371, long:36.9580}, 
    //     zoom: 7,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // create map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0.4371, lng: 36.9580 },
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // creates a direction service object to use the route method
    directionsService = new google.maps.DirectionsService();
    // create a directions renderer object which we'll to render the DIRECTIONS routes
    directionsRenderer = new google.maps.DirectionsRenderer();
    // bind the direction to the maps
    directionsRenderer.setMap(map);
    // var options = {
    //     type: ['(cities)']
    // }
    // const defaultBounds = {
    //     north: center.lat + 0.1,
    //     south: center.lat - 0.1,
    //     east: center.lng + 0.1,
    //     west: center.lng - 0.1,
    //   };
      const input = document.getElementById("from");
      const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["establishment"],
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);
}
// function to calculate the Distance and find time it takes
function calcRoute() {
    // create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, // WALKING, CYCLING  AND TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    };
    // PASS THE REQUEST TO THE ROUTE METHOD
    try {
        directionsService.route(request, (res, status) => {
            if (status == google.maps.DirectionsStatus.OK) {

                //get distance and time
                const output = document.querySelector("#output");
                output.innerHTML = "<div class='alert-info'> From: " +
                    document.getElementById("from") +
                    ". <br/> To:"
                    + document.getElementById("to").value +
                    ". <br/> Driving Distance: " + res.routes[0].legs[0].distance.text + ". <br/> Duration: " + res.routes[0].legs[0].duration.text +
                    "</div>";
                // display route
                directionsRenderer.setDirections(res)
            } else {
                // delete routes from map
                directionsRenderer.setDirections({
                    routes: []
                });
                //center map in your location
                map.setCenter({ lat: 0.4371, lng: 36.9580 });

                //show error message
                output.innerHTML = "<div class='alert-danger'><h1>Yoy cannot travel over the sea</h1></div>"
            }
        });
    } catch (e) {
        console.log('there is an error' + e);
    }
}
// autocomplee objects for all input
// var options = {
//     type: ['(cities)']
// }
// var input1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

// var input2 = document.getElementById("to");
// var autocomplete1 = new google.maps.places.Autocomplete(input2, options);
