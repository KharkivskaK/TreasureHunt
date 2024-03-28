const API_BASE_URL = "https://codecyprus.org/th/api/";
const API_SELECT_CATEGORY = API_BASE_URL + "list";
const API_START = API_BASE_URL + "start";
const API_QUESTION = API_BASE_URL + "question";
const API_ANSWER = API_BASE_URL + "answer";
const API_SKIP = API_BASE_URL + "skip";
const API_SCORE = API_BASE_URL + "score";
const API_LEADERBOARD = API_BASE_URL + "leaderboard";
const API_LOCATION = API_BASE_URL + "location";

// Constant definitions for question types
const QUESTION_BOOLEAN = "BOOLEAN";
const QUESTION_INTEGER = "INTEGER";
const QUESTION_NUMERIC = "NUMERIC";
const QUESTION_MCQ = "MCQ";
const QUESTION_TEXT = "TEXT";


// Function to retrieve the value of a query parameter by name
function getQueryParamValue(varName) {
    var $_GET = {};

    if (document.location.search !== '') {
        var query = document.location.search.substring(1).split('&');

        for (var i = 0; i < query.length; i++) {
            var pair = query[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = pair.length == 2 ? decodeURIComponent(pair[1]) : null;

            $_GET[key] = value;
        }
    }
    return $_GET[varName] || null;
}


// Function to display snackbar notification
var createSnackbar = (function() {
  var previous = null;
  return function(message, time, actionText, action) {
    if (previous) previous.dismiss();
	if (typeof time == 'undefined') time = 1500;
    var snackbar = document.createElement('div');
    snackbar.className = 'paper-snackbar';
    snackbar.dismiss = function() {
      this.style.opacity = 0;
    };
    var text = document.createTextNode(message);
    snackbar.appendChild(text);
	if (actionText) {
      if (!action) action = snackbar.dismiss.bind(snackbar);
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = actionText;
      actionButton.addEventListener('click', action);
      snackbar.appendChild(actionButton);
    }
    setTimeout(function() {
      if (previous === this) previous.dismiss();
    }.bind(snackbar), time);//end setTimeout()
    
    snackbar.addEventListener('transitionend', function(event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity == 0) {
        this.parentElement.removeChild(this);
        if (previous === this) previous = null;
      }
    }.bind(snackbar));

    previous = snackbar;
    document.body.appendChild(snackbar);
    getComputedStyle(snackbar).bottom;
    snackbar.style.bottom = '0px';
    snackbar.style.opacity = 0.97;
  };
})();


// Function to display a modal by name
function showModal(name) {
	document.getElementById(name).style.display='block'
}

// Function to hide a modal by name
function hideModal(name) {
	document.getElementById(name).style.display='none'
}

// Function to convert a timestamp to a time string
function timestampToTime(finishTime) {
    if (finishTime === 0) return "unfinished";

    const milliseconds = finishTime % 1000;
    const seconds = Math.floor(finishTime / 1000) % 60;
    const minutes = Math.floor(finishTime / (1000 * 60)) % 60;
    const hours = Math.floor(finishTime / (1000 * 60 * 60)) % 24;

    const formatNumber = num => num.toString().padStart(2, '0');
    const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${milliseconds.toString().padStart(3, '0')}`;
    return formattedTime;
}

// Function to append the appropriate ordinal suffix to a number
function getSuffix(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";	
}

// Function to display a popup with a given ID
function showPopup(id) {
    document.getElementById('wrapper').style.display = 'block';

    var popups = document.getElementsByClassName('popup-container');
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = 'none';
    }
    document.getElementById(id).style.display = 'block';
}

// Function to hide the overlay and all popups
function hideWrapper() {
    document.getElementById('wrapper').style.display = 'none';

    var popups = document.getElementsByClassName('popup-container');
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = 'none';
    }
}

// Initializes functionalities once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const boxIcons = document.querySelectorAll('.popup-content .popup-icon, .popup-content .popup-icon2');
    boxIcons.forEach(icon => {
        observer.observe(icon);
    });
});
