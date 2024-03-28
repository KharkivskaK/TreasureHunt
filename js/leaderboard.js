
function createLeaderboard() {
  // Retrieve session ID from cookie
  var SESSION_ID = getCookie(COOKIE_SESSION_ID);

  // Clear session-related cookies
  deleteCookie(COOKIE_SESSION_ID);
  deleteCookie(COOKIE_PLAYER_NAME);
  deleteCookie(COOKIE_CATEGORY_NAME);
  deleteCookie(COOKIE_NUM_OF_QUESTIONS);

  // Retrieve current player's name from URL parameter
  var currentPlayerName = getQueryParamValue("playerName");
  var currentPlayerRank;
  var currentPlayerScore;

  // Display loading indicator
  document.getElementById("loader").style.display = "block";
  document.getElementById("container").style.display = "none";

  var currentPlayerCompletion = false;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      var statusItem = jsonData.status;
      if (statusItem == "OK") {
        var data = jsonData.leaderboard;
        var list = document.getElementById("scoreboardList");
        for (var i in data) {
          if (data[i].player == currentPlayerName) {
            currentPlayerRank = Number(i) + 1;
            currentPlayerScore = data[i].score;
            currentPlayerCompletion = data[i].completionTime > 0;
          }

          // Create scoreboard entry elements
          var entry = document.createElement("li");
          var scorebox = document.createElement("div");
          var playerName = document.createElement("div");
          var rank = document.createElement("div");
          playerName.innerHTML = data[i].player;
          rank.innerHTML = Number(i) + 1;
          if (Number(i) + 1 == 11) entry.style.backgroundColor = "lawngreen";
          if (data[i].player == currentPlayerName)
            entry.className += "currentPlayer tooltip";
          else entry.className += "tooltip";
          var timeFinished = document.createElement("small");
          timeFinished.innerHTML =
            "<br>Time since start: " + timestampToTime(data[i].completionTime);
          var clearfloat = document.createElement("div");
          scorebox.innerHTML = data[i].score + " Pts";
          scorebox.className = "scoreBox";
          playerName.className = "playerName";
          timeFinished.className = "timeFinished";
          clearfloat.className = "clearFloat";
          rank.className = "rank";
          entry.appendChild(playerName);
          entry.appendChild(rank);
          entry.appendChild(timeFinished);
          entry.appendChild(scorebox);
          entry.appendChild(clearfloat);
          list.appendChild(entry);
        }

        var rankSuffix = getSuffix(currentPlayerRank);
        document.getElementById("scoreFeedback").innerHTML =
          "You scored " +
          currentPlayerScore +
          " points and ranked " +
          rankSuffix +
          ".";
      } else alert(jsonData.status + " " + jsonData.message);

      document.getElementById("loader").style.display = "none";
      document.getElementById("container").style.display = "block";
    }
  };

  xhttp.open(
    "GET",
    API_LEADERBOARD + "?session=" + sessionID + "&sorted",
    true
  );
  xhttp.send();
}
function getScoreboardAsPopup() {
  var sessionID;
  var currentPlayerName = getCookie(COOKIE_PLAYER_NAME);

  // Redirect to index.html if session ID cookie doesn't exist
  if (!cookieExists(COOKIE_SESSION_ID)) {
    document.location.href = "index.html";
    return; // Exit the function
  } else {
    sessionID = getCookie(COOKIE_SESSION_ID);
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      var statusItem = jsonData.status;
      if (statusItem == "OK") {
        var data = jsonData.leaderboard;
        var list = document.getElementById("scoreList");
        list.className += "noRadius";

        // Clear existing scoreboard entries
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }

        var playersRank = 0;

        for (var i in data) {
          var entry = document.createElement("li");
          var scorebox = document.createElement("div");
          var playerName = document.createElement("div");
          var rank = document.createElement("div");
          playerName.innerHTML = data[i].player;
          rank.innerHTML = Number(i) + 1;

          // Styling for specific ranks
          if (Number(i) + 1 == 11) {
            entry.style.borderTopStyle = "dotted";
          }
          if (data[i].player == currentPlayerName) {
            entry.className += "currentPlayer";
            playersRank = Number(i) + 1;
          }

          var clearfloat = document.createElement("div");
          scorebox.innerHTML = data[i].score + " Pts";
          scorebox.className = "scoreBox";
          playerName.className = "playerName";
          clearfloat.className = "clearFloat";
          rank.className = "rank rankFix";
          entry.appendChild(rank);
          entry.appendChild(playerName);
          entry.appendChild(scorebox);
          entry.appendChild(clearfloat);
          list.appendChild(entry);
        }

        // Add an additional item showing the player's rank
        var playersRankItem = document.createElement("li");
        playersRankItem.innerHTML = "Your position: " + getSuffix(playersRank);
        playersRankItem.className += "playerRankingMiniScoreboard";

        // Styling for player's rank
        if (playersRank >= 4) {
          playersRankItem.style.backgroundColor = "#FFFFFF";
        }
        if (playersRank == 1) {
          playersRankItem.style.backgroundColor = "#CCAC00"; // Gold
        }
        if (playersRank == 2) {
          playersRankItem.style.backgroundColor = "#DDDDDD"; // Silver
        }
        if (playersRank == 3) {
          playersRankItem.style.backgroundColor = "#cd7f32"; // Bronze
        }
        if (playersRank < 4) {
          playersRankItem.style.color = "white";
        }
        list.insertBefore(playersRankItem, list.firstChild);
      }
    }
  };

  // Send request to retrieve leaderboard data
  xhttp.open(
    "GET",
    API_LEADERBOARD + "?session=" + sessionID + "&sorted",
    true
  );
  xhttp.send();
}
