var citynameInput = document.querySelector('#city');
var weatherForm = document.querySelector('#weather-form');
var weatherCity = document.querySelector('#cityweather');


var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(citynameInput);
    var cityname = citynameInput.value.trim();
    
    if (cityname) {
      getWeather(cityname);
      citynameInput.value = '';
    } else {
      alert('Please enter the name of a city');
    }
  };

  const APIKey = "8b3db50a4a4c1622c64a0fa5c6659875";
  
  function getWeather (cityname) {
    var cityapiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname +"&appid=" + APIKey;
    fetch(cityapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
          displayCities(data, cityname);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};
 
function displayCities (data, cityname) {

    weatherCity.classList.remove("d-none");
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    
    var weatherapiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid="+ APIKey;
    fetch(weatherapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
        document.getElementById("City").textContent= cityname;
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












 