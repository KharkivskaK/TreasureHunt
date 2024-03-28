// Function to handle and display errors returned from the API
function handleErrors(jsonData) {
  var errorMessages = jsonData.errorMessages.join("\n");
  var errorStr = jsonData.status + ":\n" + errorMessages;
  alert(errorStr);
}

// Function to handle HTTP errors that occur during API requests
function handleHTTPError(status) {
  alert("HTTP Error: " + status);
}

// Function to process updating the score by making an API call
function processUpdateScore() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        var jsonData = JSON.parse(xhttp.responseText);
        var statusItem = jsonData.status;

        if (statusItem == "OK") {
          var score = jsonData.score;
          var scoreLabel = document.getElementById("scoreNum");
          scoreLabel.innerHTML = score;
          changeScoreLabelColor();
        } else {
          handleErrors(jsonData);
        }
      } else {
        handleHTTPError(xhttp.status);
      }
    }
  };

  xhttp.open("GET", API_SCORE + "?session=" + sessionID, true);
  xhttp.send();
}

// Function to change the color of the score label based on the score value
function changeScoreLabelColor() {
  var score = document.getElementById("scoreNum");
  if (score.innerHTML > 0) score.style.color = "green";
  else if (score.innerHTML == 0) score.style.color = "#FF5100";
  else score.style.color = "red";
}

// Function to fetch and update the question from the server
function fetchAndUpdateQuestion() {
  // Show loader and hide container
  document.getElementById("loadingBar").style.display = "block";
  document.getElementById("container").style.display = "none";

  // Reset all answer fields
  resetAllAnswerFields();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        var jsonData = JSON.parse(xhttp.responseText);
        var statusItem = jsonData.status;

        if (statusItem == "OK") {
          // Redirect if all questions answered
          if (jsonData.currentQuestionIndex >= jsonData.numOfQuestions) {
            window.location.href =
              "leaderboard.html?sessionID=" +
              sessionID +
              "&playerName=" +
              getCookie(COOKIE_PLAYER_NAME);
            return; // Exit function
          }

          // Show container and question
          document.getElementById("container").style.display = "inline";
          document.getElementById("questionFromServer").innerHTML = jsonData.questionText;

          // Show/hide skip button
          document.getElementById("buttonSkip").style.display =
            jsonData.canBeSkipped ? "inline" : "none";

          // Decide which form to display
          var forms = [
            "mcqForm",
            "textForm",
            "integerForm",
            "numberForm",
            "booleanForm",
          ];
          forms.forEach(function (form) {
            document.getElementById(form).style.display = "none";
          });

          //converting questiontype to lowercase as it was uppercase from responce
          document.getElementById(
            jsonData.questionType.toLowerCase() + "Form"
          ).style.display = "inline";

          // Hide loader and display the page
          document.getElementById("loadingBar").style.display = "none";
          document.getElementById("container").style.display = "block";

          // Set location bubble
          document.getElementById("reqLocation").style.display =
            jsonData.requiresLocation ? "inline" : "none";
        } else {
          // Handle errors
          var errorMessages = jsonData.errorMessages.join("\n");
          var errorStr = jsonData.status + ":\n" + errorMessages;
          alert(errorStr);
          window.location = "app.html";
        }
      } else {
        // Handle HTTP errors
        alert("HTTP Error: " + xhttp.status);
      }
    }
  };

  xhttp.open("GET", API_QUESTION + "?session=" + sessionID, true);
  xhttp.send();
}

// Function to process the user's answer submission
function processQuestion(answer) {
  if (!navigator.onLine) {
    displayMessage(
      "Connection error - Please make sure you have an internet connection"
    );
  } else {
    geo();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var jsonData = JSON.parse(xhttp.responseText);
        if (jsonData.status == "OK") {
          processUpdateScore();

          if (jsonData.correct && !jsonData.completed) {
            displayMessage(jsonData.message);
            fetchAndUpdateQuestion();
          }

          else if (jsonData.correct && jsonData.completed) {
            displayMessage(jsonData.message);
            fetchAndUpdateQuestion();
            setTimeout(function () {}, 1000);
            window.location.href =
              "leaderboard.html?sessionID=" +
              sessionID +
              "&playerName=" +
              getCookie(COOKIE_PLAYER_NAME);
          }

          else if (!jsonData.correct && !jsonData.completed) {
            displayMessage(jsonData.message);
            fetchAndUpdateQuestion();
          }

          else if (!jsonData.correct && jsonData.completed) {
            displayMessage(jsonData.message);
            setTimeout(function () {}, 1000);
            window.location.href =
              "leaderboard.html?sessionID=" +
              sessionID +
              "&playerName=" +
              getCookie(COOKIE_PLAYER_NAME);
          }
          else alert("Unexpected Problem");
        }
        else {
          var errorMessages = "";
          for (var i = 0; i < jsonData.errorMessages.length; i++) {
            errorMessages += jsonData.errorMessages[i] + "\n";
          }
          var errorStr = jsonData.status + ":\n" + errorMessages;
          displayMessage(errorStr);
          setTimeout(function () {}, 1000);
          window.location.href =
            "leaderboard.html?sessionID=" +
            sessionID +
            "&playerName=" +
            getCookie(COOKIE_PLAYER_NAME);
        }
      }
    };
    xhttp.open(
      "GET",
      API_ANSWER + "?answer=" + answer + "&session=" + sessionID,
      true
    );
    xhttp.send();
  }
}

// Function to show a modal dialog
function showModal() {
  document.getElementById("skipModal").style.display = "block";
}

// Function to hide a modal dialog
function hideModal() {
  document.getElementById("skipModal").style.display = "none";
}

// Function to process skipping a question
function processSkipQuestion() {
  hideModal();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      if (jsonData.status === "OK") {
        processUpdateScore();

        if (!jsonData.completed) {
          fetchAndUpdateQuestion();
          displayMessage("Skipped question", 2000);
        } else {
          window.location.href =
            "leaderboard.html?sessionID=" +
            encodeURIComponent(sessionID) +
            "&playerName=" +
            encodeURIComponent(getCookie(COOKIE_PLAYER_NAME));
        }
      } else {
        var errorMessages = jsonData.errorMessages.join("\n");
        alert("Error: " + errorMessages);
      }
    }
  };
  xhttp.open(
    "GET",
    API_SKIP + "?session=" + encodeURIComponent(sessionID),
    true
  );
  xhttp.send();
}

// Function to display a message, used for displaying error or success messages
function displayMessage(message, duration) {
  console.log(message);
}

// Function to validate the answer input and process it
function validateAnswerAndProcess(e) {
  let answer = e.value.trim();
  if (!answer) {
    displayMessage("Please provide an answer");
  } else {
    const isIntegerFormVisible =
      document.getElementById("integerForm").style.display === "inline";
    if (isIntegerFormVisible) {
      if (!Number.isInteger(Number(answer))) {
        displayMessage("Please provide an integer number. (1, 2, 3...)");
        return;
      }
    }
    processQuestion(answer);
  }
}

// Function to reset answer input fields before fetching a new question
function resetAllAnswerFields() {
  document.getElementById("answerNumber").value = "";
  document.getElementById("answerInteger").value = "";
  document.getElementById("answerText").value = "";
}
