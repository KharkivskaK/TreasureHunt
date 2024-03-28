// Initialize a new XMLHttpRequest object for asynchronous server request
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  var displayedCategories = 0;
  var categoryList = document.getElementById("categoryItem");

  // Check if the request has completed
  if (xhttp.readyState === 4) {
    document.getElementById("loadingBar").style.display = "none";
    document.getElementById("categoriesContainer").style.display = "block";

    // Check if the request was successful
    if (xhttp.status === 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      if (jsonData.status == "OK") {
        const dateTimeNow = new Date().getTime();
        var numOfCategories = jsonData.treasureHunts.length;

        // Iterate through each category
        for (var i = 0; i < numOfCategories; i++) {
          var currentItem = jsonData.treasureHunts[i];
          var startsOnTime = currentItem.startsOn;
          var endsOnTime = currentItem.endsOn;
          var isPublic = currentItem.visibility === "PUBLIC";

          if (isPublic) {
            displayedCategories++;

            // Check if the current time is within the start and end times of the category
            if (dateTimeNow >= startsOnTime && dateTimeNow <= endsOnTime) {
              var a = document.createElement("a");
              var newItem = document.createElement("li");
              a.textContent = currentItem.name;
              a.setAttribute(
                "href",
                "register.html?cuuid=" +
                  currentItem.uuid +
                  "&cname=" +
                  currentItem.name
              );
              newItem.appendChild(a);
              categoryList.appendChild(newItem);
            }
            else if (startsOnTime > dateTimeNow) {
              // Create a new disabled list item if the category hasn't started yet
              var newItem = document.createElement("li");
              newItem.className += "disabled disabled-button";
              newItem.textContent = currentItem.name;
              categoryList.appendChild(newItem);
            }
            else {
              // Log expired treasure hunts
              console.log(
                "Found an expired Treasure hunt: " + currentItem.name
              );
            }
          }
        }

        // Display a message if no categories are available to be displayed
        if (displayedCategories < 1) {
          var noCategoriesItem = document.createElement("li");
          noCategoriesItem.style.color = "#888";
          noCategoriesItem.innerHTML = "<i>No categories</i>";
          categoryList.appendChild(noCategoriesItem);
        }
      }
      else {
        // Display a message if there was a problem fetching categories
        displayMessage(
          "! Problem while fetching the categories (status code: " +
            xhttp.status +
            ") !"
        );
      }
    }
    else {
      // Display a message if there was a problem contacting the server
      displayMessage(
        "! Problem while contacting the server (status code: " +
          xhttp.status +
          ") !"
      );
    }
  }
  else if (xhttp.readyState === 4) {
    // This block appears redundant and may never be executed due to the previous condition also checking for readyState === 4
    displayMessage(
      "! Problem while contacting the server (ready state: " +
        xhttp.readyState +
        ", status code: " +
        xhttp.status +
        ") !"
    );
    document.getElementById("loader").style.display = "none";
    document.getElementById("categoriesContainer").style.display = "block";
  }
};

// Prepare the GET request with the API endpoint to select categories
xhttp.open("GET", API_SELECT_CATEGORY, true);
// Sends the request to the server
xhttp.send();
