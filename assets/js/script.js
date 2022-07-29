var citynameInput = document.querySelector('#city');
var weatherForm = document.querySelector('#weather-form');
var weatherCity = document.querySelector('#cityweather');
var storedCities = document.querySelector('#storedCities');

let cities = [];
const APIKey = "8b3db50a4a4c1622c64a0fa5c6659875";

var formSubmitHandler = function (event) {
    event.preventDefault();
 
    let cityname = citynameInput.value.trim().toUpperCase();
    console.log(cities);
    getWeather(cityname);  
    cities.push(cityname);

    if (cityname) {
        citynameInput.value = '';
      } else {
        alert('Please enter the name of a city');
      }
    
    renderHistory();
    storeCities();   
};

// Rendering search history
function renderHistory() {
    storedCities.innerHTML = "";  
    for (var i = 0; i < cities.length; i++){
        var city = cities[i];
        li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);
        storedCities.appendChild(li);
    }
    console.log(cities);
}  

function storeCities() {
    localStorage.setItem("City", JSON.stringify(cities));
}

var sCities = JSON.parse(localStorage.getItem("City"));
    if (sCities !== null) {
    cities = sCities;
}

function getWeather (cityname) {
    var cityapiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname +"&appid=" + APIKey;
    fetch(cityapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
          displayCities(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};
 
function displayCities (data) {

    weatherCity.classList.remove("d-none");
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    
    var weatherapiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid="+ APIKey;
    fetch(weatherapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
        document.getElementById("cityname").textContent= data.name;
        document.getElementById("Temp").textContent= "Temperature: " + data.main.temp + " °C";
        document.getElementById("Wind").textContent= "Wind: " + data.wind.speed + " meter/sec";
        document.getElementById("Humidity").textContent= "Humidity: " + data.main.humidity + " %";
        document.getElementById("UV Index").textContent= "UV Index: " + data.main.temp + " °C";
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });

}
        
// Function call when clicking "Search" button
weatherForm.addEventListener('submit', formSubmitHandler);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // if (repos.length === 0) {
    //       repoContainerEl.textContent = 'No repositories found.';
    //       return;
    //     }
      
    //     repoSearchTerm.textContent = searchTerm;
      
    //     for (var i = 0; i < repos.length; i++) {
    //       var repoName = repos[i].owner.login + '/' + repos[i].name;
      
    //       var repoEl = document.createElement('a');
    //       repoEl.classList = 'list-item flex-row justify-space-between align-center';
    //       repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
      
    //       var titleEl = document.createElement('span');
    //       titleEl.textContent = repoName;
      
    //       repoEl.appendChild(titleEl);
      
    //       var statusEl = document.createElement('span');
    //       statusEl.classList = 'flex-row align-center';
      
    //       if (repos[i].open_issues_count > 0) {
    //         statusEl.innerHTML =
    //           "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    //       } else {
    //         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //       }
      
    //       repoEl.appendChild(statusEl);
      
    //       repoContainerEl.appendChild(repoEl);
    //     }












 