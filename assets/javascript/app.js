var topics = ["Goku", "Gohan", "Vegeta", "Krillin"];
var grabButtons;
var attribute;
var newButtonValue;
var alreadyClicked = false;

function get(url) {
  return new Promise (function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function() {
      if (xhttp.status === 200) {
        resolve(JSON.parse(xhttp.response));
      }
      else {
        reject(xhttp.statusText);
      }
    };
    xhttp.onerorr = function() {
      reject(xhttp.statusText);
    };
    xhttp.send();
  });
}

function createButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newDiv = document.createElement("div");
    var newButton = document.createElement("button");
    newButton.setAttribute("class", "tvShowButtons");
    newButton.setAttribute("data-show", topics[i]);
    newButton.innerHTML = topics[i];
    newDiv.appendChild(newButton);
    var buttonsDiv = document.getElementById("buttonsHere");
    buttonsDiv.appendChild(newButton);
  }
}

function createNewButtons() {
  var newDiv = document.createElement("div");
  var newButton = document.createElement("button");
  newButton.setAttribute("class", "tvShowButtons");
  newButton.setAttribute("data-show", newButtonValue);
  newButton.innerHTML = newButtonValue;
  newDiv.appendChild(newButton);
  var buttonsDiv = document.getElementById("buttonsHere");
  buttonsDiv.appendChild(newButton);
}

function buttonsClicked(event) {
  event.preventDefault();
  alreadyClicked = true;
  for (var i = 0; i < grabButtons.length; i ++) {
    attribute = grabButtons[i].getAttribute("data-show");
    if (attribute === event.target.innerHTML) {
      var search = event.target.innerHTML;
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

      var promise = get(queryURL);
      promise.then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = document.createElement("div");
          var gifImage = document.createElement("img");
          gifImage.setAttribute("src", results[i].images.fixed_height_still.url );
          gifImage.setAttribute("data-animate", results[i].images.fixed_height.url);
          gifImage.setAttribute("data-still", results[i].images.fixed_height_still.url);
          gifImage.setAttribute("data-still", "still");
          gifDiv.appendChild(gifImage);
          document.getElementById("gifsHere").appendChild(gifDiv);
        }
      }).catch(function(error) {
        console.log(error);
      });

    }
  }
}

function eventButtons(){
  grabButtons = document.getElementsByClassName("tvShowButtons");
  for (var i = 0; i < grabButtons.length; i++) {
    grabButtons[i].addEventListener("click", buttonsClicked);
  }
}

function renderNewButtons(event){
  event.preventDefault();
  newButtonValue = document.getElementById("newButtonText").value;
  topics.push(newButtonValue);
  createNewButtons();
  eventButtons();
}

// add Event Handler for all buttons on page
createButtons();
eventButtons();

document.getElementById("formButton").addEventListener("click", renderNewButtons);
