function createLeaderboard() {
 // Define an array of cookies to clear, including the session ID retrieval
const cookiesToClear = [COOKIE_SESSION_ID, COOKIE_PLAYER_NAME, COOKIE_CATEGORY_NAME, COOKIE_NUM_OF_QUESTIONS];
const SESSION_ID = getCookie(COOKIE_SESSION_ID);

cookiesToClear.forEach(cookieName => deleteCookie(cookieName));


  // Retrieve current player's name from URL parameter
  var currentPlayerName = getQueryParamValue("playerName");
  var currentPlayerRank;
  var currentPlayerScore;

  // Display loading indicator
  toggleLoadingIndicator(true);

  var currentPlayerCompletion = false;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      var statusItem = jsonData.status;
      if (statusItem == "OK") {
        var data = jsonData.leaderboard;
        var list = document.getElementById("leaderboardList");
        // Iterate over each player data and create the scoreboard entry
  data.forEach((playerData, index) => {
    const rank = index + 1;
    const isCurrentPlayer = playerData.player === currentPlayerName;

    if (isCurrentPlayer) {
      currentPlayerRank = rank;
      currentPlayerScore = playerData.score;
      currentPlayerCompletion = playerData.completionTime > 0;
    }

    const entry = createElementWithClass("li", "tooltip" + (isCurrentPlayer ? " currentPlayer" : ""));
    const scorebox = createElementWithClass("div", "scoreBox", `${playerData.score} Pts`);
    const playerName = createElementWithClass("div", "playerName", playerData.player);
    const rankElement = createElementWithClass("div", "rank", String(rank));
    const timeFinished = createElementWithClass("small", "timeFinished", `<br>Time since start: ${timestampToTime(playerData.completionTime)}`);
    const clearfloat = createElementWithClass("div", "clearFloat");

    if (rank === 11) entry.style.backgroundColor = "lawngreen";

    entry.appendChild(playerName);
    entry.appendChild(rankElement);
    entry.appendChild(timeFinished);
    entry.appendChild(scorebox);
    entry.appendChild(clearfloat);
    list.appendChild(entry);
  });

  // Display player's score and rank message
  const rankSuffix = getSuffix(currentPlayerRank);
  document.getElementById("scoreFeedback").innerHTML = `You scored ${currentPlayerScore} points and ranked ${rankSuffix}.`;
      } else alert(jsonData.status + " " + jsonData.message);

      // Hide loading indicator and display container
      toggleLoadingIndicator(false)
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
function toggleLoadingIndicator(show) {
  const loader = document.getElementById("loader");
  const container = document.getElementById("container");

  if (show) {
    loader.style.display = "block";
    container.style.display = "none";
  } else {
    loader.style.display = "none";
    container.style.display = "block";
  }
}

function getScoreboardAsPopup() {
  let sessionID;
  const currentPlayerName = getCookie('COOKIE_PLAYER_NAME');

  // Redirect to index.html if session ID cookie doesn't exist
  if (!cookieExists('COOKIE_SESSION_ID')) {
    window.location.href = "index.html";
    return; // Exit the function
  } else {
    sessionID = getCookie('COOKIE_SESSION_ID');
  }

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonData = JSON.parse(xhttp.responseText);
      const statusItem = jsonData.status;
      if (statusItem === "OK") {
        const data = jsonData.leaderboard;
        const list = document.getElementById("scoreList");
        list.classList.add("noRadius");

        // Clear existing scoreboard entries
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }

        let playersRank = 0;

        data.forEach((playerData, index) => {
          const entry = document.createElement("li");
          const scorebox = document.createElement("div");
          const playerName = document.createElement("div");
          const rank = document.createElement("div");
          playerName.innerHTML = playerData.player;
          rank.innerHTML = index + 1;

          // Styling for specific ranks
          if (index + 1 === 11) {
            entry.style.borderTopStyle = "dotted";
          }
          if (playerData.player === currentPlayerName) {
            entry.classList.add("currentPlayer");
            playersRank = index + 1;
          }

          const clearfloat = document.createElement("div");
          scorebox.innerHTML = `${playerData.score} Pts`;
          scorebox.classList.add("scoreBox");
          playerName.classList.add("playerName");
          clearfloat.classList.add("clearFloat");
          rank.classList.add("rank", "rankFix");
          entry.appendChild(rank);
          entry.appendChild(playerName);
          entry.appendChild(scorebox);
          entry.appendChild(clearfloat);
          list.appendChild(entry);
        });

        // Add an additional item showing the player's rank
        const playersRankItem = document.createElement("li");
        playersRankItem.innerHTML = `Your position: ${getSuffix(playersRank)}`;
        playersRankItem.classList.add("playerRankingMiniScoreboard");

        // Styling for player's rank
        playersRankItem.style.backgroundColor = playersRank >= 4 ? "#FFFFFF" : 
                                                playersRank === 1 ? "#CCAC00" : // Gold
                                                playersRank === 2 ? "#DDDDDD" : // Silver
                                                "#cd7f32"; // Bronze
        if (playersRank < 4) {
          playersRankItem.style.color = "white";
        }
        list.insertBefore(playersRankItem, list.firstChild);
      }
    }
  };

  // Send request to retrieve leaderboard data
  xhttp.open("GET", `${API_LEADERBOARD}?session=${sessionID}&sorted`, true);
  xhttp.send();
}
// Helper function to create a DOM element with options
function createElementWithClass(tag, className, innerHTML = '') {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
}

data.forEach((playerData, index) => {
  const rank = index + 1;
  const isCurrentPlayer = playerData.player === currentPlayerName;

  if (isCurrentPlayer) {
    currentPlayerRank = rank;
    currentPlayerScore = playerData.score;
    currentPlayerCompletion = playerData.completionTime > 0;
  }

  const entry = createElementWithClass("li", "tooltip" + (isCurrentPlayer ? " currentPlayer" : ""));
  const scorebox = createElementWithClass("div", "scoreBox", `${playerData.score} Pts`);
  const playerName = createElementWithClass("div", "playerName", playerData.player);
  const rankElement = createElementWithClass("div", "rank", String(rank));
  const timeFinished = createElementWithClass("small", "timeFinished", `<br>Time since start: ${timestampToTime(playerData.completionTime)}`);
  const clearfloat = createElementWithClass("div", "clearFloat");

  if (rank === 11) entry.style.backgroundColor = "#2ed655";

  entry.appendChild(playerName);
  entry.appendChild(rankElement);
  entry.appendChild(timeFinished);
  entry.appendChild(scorebox);
  entry.appendChild(clearfloat);
  list.appendChild(entry);
});
