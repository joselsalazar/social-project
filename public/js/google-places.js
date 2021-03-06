/**
 * This example requires the Places library. Include the libraries=places
 * parameter when you first load the API. For example: <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
 * 
 * All supporting types can be found here: https://developers.google.com/places/supported_types
 */
var map, infoWindow, pos;
function launchPlacesUsingGeolocation() {
  // Note: This requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you (default Phoenix Arizona coordinates)
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.4484, lng: -112.0740},
    zoom: 18
  });
  infoWindow = new google.maps.InfoWindow;

  var selected_types = [];
  $(".map-type").each(function(index) {
    if ( this.checked )
    {
      selected_types.push(this.value);
    }
  });

  // HTML5 geolocation.
  if (navigator.geolocation) {
    console.log('launching nearbySearch: ' + selected_types);

    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch({
        location: pos,
        radius: 500,
        type: selected_types,
      }, callback);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  $( "#map" ).toggle(true);
  $( "#intro-header" ).toggle(false);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}