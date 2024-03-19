var categorySelectedUUID = fetchGetVariable("cuuid");
var categorySelectedName = fetchGetVariable("cname");
categorySelectedName = categorySelectedName.split('+').join(' ');
var registerBubble = document.getElementById('registerBubble');
registerBubble.innerHTML = "<p> You are looking for the \"" + categorySelectedName + "\"  treasure. Now tell us your name and e-mail and we are ready to go!</p>" +
    "<p style='color:red'>Make sure you <u>ALLOW</u> Geolocation in your browser!";

var categoryUUID = fetchGetVariable("categoryUUID");
var categoryName = fetchGetVariable("categoryName");
var playerName = fetchGetVariable("firstPirateName");
var playerGender = fetchGetVariable("gender");
const APP_ID = "THC-WebApp";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var jsonData = JSON.parse(xhttp.responseText);
        var statusItem = jsonData.status;

        if (statusItem == "OK") {
            var sessionID = jsonData.session;
            var numOfQuestions = jsonData.numOfQuestions;
            setCookie(COOKIE_SESSION_ID, sessionID, 365);
            setCookie(COOKIE_PLAYER_NAME, playerName, 365);
            setCookie(COOKIE_CATEGORY_NAME, categoryName, 365);
            setCookie(COOKIE_NUM_OF_QUESTIONS, numOfQuestions, 365);
            window.location.href = "question.html";
        }//end if OK
        else {
            var errorMessages = "";
            for (var i = 0; i < jsonData.errorMessages.length; i++) {
                errorMessages += jsonData.errorMessages[i] + "\n";
            }
            alert(jsonData.status + ":\n" + errorMessages);
            window.location.href = "register.html?cuuid=" + categoryUUID + "&cname=" + categoryName;
        }//end if not OK

        //Hide the loader, display page:
        document.getElementById("loader").style.display = "none";
        document.getElementById("container").style.display = "block";

    }
};

xhttp.open("GET", API_START + "?player=" + playerName + "&app=" + APP_ID + "&treasure-hunt-id=" + categoryUUID + "&gender=" + playerGender, true);
xhttp.send();









