var initialise = function(){
  var mapDiv = document.getElementById("main-map");
  var center = {lat: 55.945752, lng: -3.20381}
  var mainMap = new MapWrapper(mapDiv, center, 10);
  mainMap.addMarker(center);

  var saltLakeAus = {lat: -28.860828, lng: 135.459224}
  var templeITrainedAt = {lat: 32.508363, lng:111.078268}

  mainMap.addMarker(saltLakeAus);
  mainMap.addMarker(templeITrainedAt);

  mainMap.addClickEvent();

  var bounceButton = document.querySelector("#button-bounce-markers");
  bounceButton.addEventListener("click", mainMap.bounceMarkers);

  var travelButton = document.querySelector("#to-texas");
  travelButton.addEventListener("click", mainMap.travelToTexas);

  var whereButton = document.querySelector("#geolocate")
  whereButton.addEventListener("click", mainMap.whereAmI)
  
}

window.addEventListener("load", initialise);
