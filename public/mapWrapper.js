var MapWrapper = function (container, coords, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
  this.markers = [];
  this.bounceMarkers = this.bounceMarkers.bind(this);
  this.travelToTexas = this.travelToTexas.bind(this);
  this.whereAmI = this.whereAmI.bind(this);
}

MapWrapper.prototype.addMarker = function(coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  var window = this.addInfoWindow();
  marker.addListener("click", function(){
    window.open(this.mainMap, marker)
  });
  this.markers.push(marker);
}

MapWrapper.prototype.addClickEvent = function () {
  var context = this;
  google.maps.event.addListener(this.googleMap, "click", function(event) {
    var coords = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    context.addMarker(coords);
    // this.addMarker(coords);
    // return coords;
    // console.log(coords);
  }//add a .bind(this) for this.addMarker to work.
)
};

MapWrapper.prototype.bounceMarkers = function () {
  this.markers.forEach(function(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
  })
};

MapWrapper.prototype.addInfoWindow = function(){
  var contentString = "Here it is...";
  var infoWindow = new google.maps.InfoWindow({
     content: contentString
   });
   return infoWindow;
};

MapWrapper.prototype.travelToTexas = function () {
  var coords = {lat: -28.854722, lng: 151.168333};
  this.addMarker(coords)
  this.googleMap.panTo(coords);
};

MapWrapper.prototype.whereAmI = function () {
  var output = document.querySelector("#output");
  var context = this;
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    // var coords = {lat: latitude, lng: longitude };
    // context.panTo(coords)
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=18&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }
  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

};
