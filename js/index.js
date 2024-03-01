const TH_BASE_URL = "https://codecyprus.org/th/api/"; // the true API base url
const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

function startGame() {
    // Placeholder for start game function
    alert("Starting the game! (Placeholder function)");
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjust based on when you want the animation to start
    });

    const icons = document.querySelectorAll('.section-icon');
    icons.forEach(icon => {
        observer.observe(icon);
    });
});


// Leaderboard
async function getLeaderBoard(url) {
    try {
        // call the web service and await for the reply to come back and be converted to JSON
        const response = await fetch(url);

        // identify the spinner, if available, using the id 'loader'...
        let spinner = document.getElementById("loader");
        // .. and stop it (by hiding it)
        spinner.hidden = true;

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const json = await response.json();

        if (json.status === "OK") {
            handleLeaderboard(json);
        } else if (json.status === "ERROR") {
            document.getElementById("message").innerHTML = json.errorMessages[0];
        }
    } catch (error) {
        document.getElementById("message").innerHTML = "There has been a problem with your fetch operation:" + error;
        console.error("There has been a problem with your fetch operation:", error);
    }
}

function handleLeaderboard(leaderboard) {
    let options = {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    let html = "";
    // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    for (const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        html += "<tr>" +
            "<td>" + entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + formattedDate + "</td>" +
            "</tr>";
    }

    let leaderboardElement = document.getElementById('test-results-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}

function isTest() {
    let url = new URL(window.location.href);
    return url.searchParams.get("test") != null;
}

function getSession() {
    let url = new URL(window.location.href);
    return url.searchParams.get("session");
}

function getTreasureHuntId() {
    let url = new URL(window.location.href);
    return url.searchParams.get("treasure-hunt-id");
}