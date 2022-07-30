
// Declared variables
var citynameInput = document.querySelector('#city');
var weatherForm = document.querySelector('#weather-form');
var weatherForecast = document.querySelector('#weatherforecast');
var weatherCity = document.querySelector('#cityweather');
var weatherIcon = document.querySelector("#weatherIcon");
var storedCities = document.querySelector('#storedCities');
var weatherPic = document.getElementById("currentweatherIcon");
var date = moment().format('L'); 
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const APIKey = "0709a135df81f93a0e587f776cb8db16";


renderSearchHistory(); 

// City name submit
var formSubmitHandler = function (event) {
    event.preventDefault();

    const cityname = citynameInput.value.trim().toUpperCase();
    getWeather(cityname);  
    searchHistory.push(cityname);
    localStorage.setItem("search", JSON.stringify(searchHistory));

    if (cityname) {
        citynameInput.value = '';
      } else {
        alert('Please enter the name of a city');
      }
    renderSearchHistory();
};

// Renders names of previous searched cities
function renderSearchHistory() {
    storedCities.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
      const historyCity = document.createElement("input");
      historyCity.setAttribute("type", "text");
      historyCity.setAttribute("readonly", true);
      historyCity.setAttribute("class", "form-control d-block bg-white");
      historyCity.setAttribute("value", searchHistory[i]);
      historyCity.addEventListener("click", function () {
        getWeather(historyCity.value);
        })
      storedCities.append(historyCity);
    }
    
// Clear history button deletes localstorage info 
    const clearHistory= document.createElement("button");
    clearHistory.setAttribute("class", "btn btn-primary mt-3");
    clearHistory.textContent= "Clear History"
    clearHistory.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        storedCities.innerHTML = "";
        })
    storedCities.append(clearHistory);
  }

// Gets information about city selected and validates
function getWeather (cityname) {
    var cityapiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname +"&appid=" + APIKey;
    fetch(cityapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};
 
// Displays current weather and forecast for five days
function displayWeather (data) {

  weatherCity.classList.remove("d-none");
    
  let lat = data.coord.lat;
  let lon = data.coord.lon;

  // Name and time for current weather
  var cityNameUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid="+ APIKey;
  fetch(cityNameUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      document.getElementById("cityname").textContent= data.name + " (" + date + ") ";
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to OpenWeather');
  });    

  // Info for current weather  
  var weatherapiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=metric&appid="+ APIKey;
  fetch(weatherapiUrl)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
          
        // Icon for current weather
        weatherPic.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon  + ".png");
        weatherPic.setAttribute("alt", data.current.weather[0].description);
       
        // Temp, Wind, Humidity and UV for current weather
        let UVIndex = document.createElement("span");
        UVIndex.textContent = data.current.uvi;
        
        document.getElementById("Temp").textContent= "Temperature: " + data.current.temp + " °C";
        document.getElementById("Wind").textContent= "Wind: " + data.current.wind_speed + " meter/sec";
        document.getElementById("Humidity").textContent= "Humidity: " + data.current.humidity + " %";
        document.getElementById("UV-Index").textContent= "UV Index: "; 
        document.getElementById("UV-Index").append(UVIndex);

        // UV Index Classification: green for favorable, yellow for moderate, and red for severe
        if (data.current.uvi < 4 ) {
          UVIndex.setAttribute("class", "badge text-bg-success");
          }
          else if (data.current.uvi < 8) {
          UVIndex.setAttribute("class", "badge text-bg-warning");
          }
          else {
          UVIndex.setAttribute("class", "badge text-bg-danger");
          }
        });

      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });    

  // Forecast for five days
  var forecastapiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid="+ APIKey; 
  fetch(forecastapiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        
          weatherForecast.classList.remove("d-none");
          const forecastEls = document.querySelectorAll(".forecast");
          for (i = 0; i < forecastEls.length; i++) {
    
            // Forecast date
            var forecastIndex = i * 8;
            forecastEls[i].innerHTML = "";
            var forecastDate = moment().add(i+1, 'days').format('L');
            var forecastDateEl = document.createElement("h4");
            forecastDateEl.setAttribute("class", "mt-3 mb-0");
            forecastDateEl.innerHTML = forecastDate;
            forecastEls[i].append(forecastDateEl);
            // Forecast icon 
            var forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt", data.list[forecastIndex].weather[0].description);
            forecastEls[i].append(forecastWeatherEl);
            // Forecast for temperature 
            var forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + " C°";
            forecastEls[i].append(forecastTempEl);
            // Forecast for wind 
            var forecastWindEl = document.createElement("p");
            forecastWindEl.innerHTML = "Wind: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastWindEl);
            // Forecast for humidity
            var forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumidityEl);

          } 
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
  