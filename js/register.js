// Retrieve necessary parameters from the URL query string
var categoryUUID = getQueryParamValue("categoryUUID");
var categoryName = getQueryParamValue("categoryName");
var playerName = getQueryParamValue("playerName");
var playerGender = getQueryParamValue("gender");
const APP_ID = "THC-WebApp";

// Initialize a new XMLHttpRequest object to communicate with the server
var xhttp = new XMLHttpRequest();

// Define the function to handle state changes of the XMLHttpRequest
xhttp.onreadystatechange = function () {
  // Check if the request is complete and successful
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var jsonData = JSON.parse(xhttp.responseText);
    var statusItem = jsonData.status;

    // Check if the server response status is OK
    if (statusItem == "OK") {
      // Extract session ID and number of questions from the response
      var sessionID = jsonData.session;
      var numOfQuestions = jsonData.numOfQuestions;

      // Store relevant data in cookies for future use
      setCookie(COOKIE_SESSION_ID, sessionID, 365);
      setCookie(COOKIE_PLAYER_NAME, playerName, 365);
      setCookie(COOKIE_CATEGORY_NAME, categoryName, 365);
      setCookie(COOKIE_NUM_OF_QUESTIONS, numOfQuestions, 365);
      window.location.href = "question.html";
    }
    else {
      // If the status is not OK, prepare error messages for alert
      var errorMessages = "";
      for (var i = 0; i < jsonData.errorMessages.length; i++) {
        errorMessages += jsonData.errorMessages[i] + "\n";
      }
      alert(jsonData.status + ":\n" + errorMessages);
      window.location.href =
        "register.html?cuuid=" + categoryUUID + "&cname=" + categoryName;
    }

    // After handling the response, hide the loader and display the main content container
    document.getElementById("loadingBar").style.display = "none";
    document.getElementById("container").style.display = "block";
  }
};

// Prepare the GET request with necessary query parameters
xhttp.open(
  "GET",
  API_START +
    "?player=" +
    playerName +
    "&app=" +
    APP_ID +
    "&treasure-hunt-id=" +
    categoryUUID +
    "&gender=" +
    playerGender,
  true
);

// Sends the request to the server
xhttp.send();
