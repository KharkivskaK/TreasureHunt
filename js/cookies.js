// Function to set a cookie with a specified name, value, and expiration in days
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

// Function to retrieve a cookie value by its name
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Function to check if a cookie exists by its name
function cookieExists(cname) {
    return getCookie(cname) !== "";
}

// Function to delete a cookie by its name
function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Constants for cookie names used in the web app
const COOKIE_CATEGORY_NAME = "THCWebApp-categoryName";
const COOKIE_PLAYER_NAME = "THCWebApp-playerName";
const COOKIE_SESSION_ID = "THCWebApp-sessionID";
const COOKIE_NUM_OF_QUESTIONS = "THCWebApp-numOfQuestions";
