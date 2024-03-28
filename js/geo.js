// Global variables to hold the client's current latitude and longitude
var GLOBAL_LAT;
var GLOBAL_LON;

// Flag to check if the location has been initialized
var GLOBAL_LocationInitialized = false;

// Function to automatically update the client's location at a set interval
function autoUpdateClientLocation(interval) {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      GLOBAL_LAT = position.coords.latitude;
      GLOBAL_LON = position.coords.longitude;
    }, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  setTimeout(function () {
    updateServerLocation(GLOBAL_LAT, GLOBAL_LON);
  }, interval);
}

// Function to update the server with the client's current location
function updateServerLocation(lat, lon) {
  if (GLOBAL_LocationInitialized) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // Handle successful response if needed
      }
    };
    xhttp.open(
      "GET",
      API_LOCATION +
        "?latitude=" +
        lat +
        "&longitude=" +
        lon +
        "&session=" +
        sessionID,
      true
    );
    xhttp.send();
  }
}

// Function to get the current position and update the server once
function geo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      updateServerLocation(position.coords.latitude, position.coords.longitude);
    }, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to handle Geolocation errors and alert the user
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "User denied the request for Geolocation. Please make sure you ALLOW Geolocation in your browser."
      );
      break;

    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;

    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;

    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
