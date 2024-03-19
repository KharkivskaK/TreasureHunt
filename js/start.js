var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {

    var displayedCategories = 0;
    var categoryList = document.getElementById("categoryList");

    if (xhttp.readyState === 4 && xhttp.status === 200) {
        var jsonData = JSON.parse(xhttp.responseText);
        if (jsonData.status == "OK") {
            var numOfCategories = jsonData.treasureHunts.length;
            const dateTimeNow = (new Date).getTime();

            for (var i = 0; i < numOfCategories; i++) {

                var currentItem = jsonData.treasureHunts[i];
                var startsOnTime = currentItem.startsOn;
                var endsOnTime = currentItem.endsOn;

                var isPublic = jsonData.treasureHunts[i].visibility === "PUBLIC";

                //Only show categories in the list if they are public:
                if (isPublic) {

                    displayedCategories++;

                    //Display the category as joinable if its start time is now or later from now and its end time is now or before now:
                    if ((dateTimeNow >= startsOnTime) && (dateTimeNow <= endsOnTime)) {
                        //Add to select element
                        var a = document.createElement("a");
                        var newItem = document.createElement("li");
                        a.textContent = currentItem.name;
                        a.setAttribute('href', "register.html?cuuid=" + currentItem.uuid + "&cname=" + currentItem.name);
                        newItem.appendChild(a);
                        categoryList.appendChild(newItem);
                    }//end if selectable entry

                    //Display the category as non-joinable if its start time is later than now:
                    else if (startsOnTime > dateTimeNow) {
                        var newItem = document.createElement("li");
                        newItem.className += "disabled disabled-button";
                        var text = document.createTextNode(currentItem.name);
                        newItem.appendChild(text);
                        document.getElementById("categoryList").appendChild(newItem);
                    }//end if non-selectable entry

                    //Otherwise just show a console message, no need to show the category:
                    else {
                        console.log("Found an expired Treasure hunt: " + currentItem.name);
                    }

                }//end if isPublic
            }//end for each category

            //If no categories have been found, show a 'No categories' message:
            if (displayedCategories < 1) {
                var noCategoriesItem = document.createElement("li");
                noCategoriesItem.style.color = "#888";
                noCategoriesItem.innerHTML = "<i>No categories</i>";
                categoryList.appendChild(noCategoriesItem);
            }

        } else if (statusItem != "OK") {
            createSnackbar('! Problem while fetching the categories (status code: ' + xhttp.status + ') !');
        } else {
            createSnackbar('! Problem while contacting the server (status code: ' + xhttp.status + ') !');
        }

        document.getElementById("loader").style.display = "none";
        document.getElementById("container").style.display = "block";
    } else if (xhttp.readyState === 4) {
        createSnackbar('! Problem while contacting the server (ready state: ' + xhttp.readyState + ', status code: ' + xhttp.status + ') !');
        document.getElementById("loader").style.display = "none";
        document.getElementById("container").style.display = "block";
    }
};

xhttp.open("GET", API_SELECT_CATEGORY, true);
xhttp.send();