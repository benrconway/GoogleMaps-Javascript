var MapWrapper = function (container, coords, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
  this.markers = [];
  this.bounceMarkers = this.bounceMarkers.bind(this);
  this.travelToTexas = this.travelToTexas.bind(this);
  this.whereAmI = this.whereAmI.bind(this);
  this.zoom = this.zoom.bind(this);
  this.moveMapToCurrentLocation = this.moveMapToCurrentLocation.bind(this);
}

MapWrapper.prototype.addMarker = function(coords, infoWindowContent) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  if (infoWindowContent){
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    })
  marker.addListener("click", function(){
      infoWindow.open(this.map, this)
      console.log("This.Map");
      console.dir(this.map);
      console.log("This.GoogleMap");
      console.dir(this.googleMap);
      console.log("marker/this");
      console.dir(marker);
      console.dir(this);
    })
  }
  // var window = this.addInfoWindow();
  // marker.addListener("click", function(){
  //   window.open(this.mainMap, marker)
  // });
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

MapWrapper.prototype.addInfoWindow = function(contentInfo){
  var infoWindow = new google.maps.InfoWindow({
     content: contentInfo
   });
   return infoWindow;
};

MapWrapper.prototype.travelToTexas = function () {
  var coords = {lat: -28.854722, lng: 151.168333};
  this.addMarker(coords)
  this.googleMap.panTo(coords);
};


// MapWrapper.prototype.geolocate = function () {
//   navigator.geolocation.getCurrentPosition(function(position){
//     var center = ({lat: position.coords.latitude, lng: position.coords.longitude })
//     this.googleMap.setCenter(center)
//     this.addMarker(center);
//   }.bind(this))
//
// };

MapWrapper.prototype.zoom = function () {
  console.log(this);
  navigator.geolocation.getCurrentPosition(this.moveMapToCurrentLocation);
};

MapWrapper.prototype.moveMapToCurrentLocation = function (position) {
  console.log(this);
  var center = ({lat: position.coords.latitude, lng: position.coords.longitude })
  this.googleMap.setCenter(center)
  this.addMarker(center);
};
