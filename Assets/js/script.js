// 7af8b9762a8ee9fd0865deb0b51f559f API key (Weather)
var APIKey = "7af8b9762a8ee9fd0865deb0b51f559f";
var cityInput = $('#city-input');
var customBox = $('.custom-box');

// When the user clicks the search button, get the city name and fetch the weather data
$('#search-button').click(function() {
    var city = cityInput.val();

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var weather = data.weather[0].description;
            var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temperature = data.main.temp;

            // Convert the temperature from Kelvin to Fahrenheit
            // Round to nearest whole number
            var temperature = Math.round(data.main.temp * 9/5 - 459.67);

            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            // Create a new Date object using Day.js
            var date = dayjs();
            var formattedDate = date.format('M/D/YYYY');

            // Clear the customBox where the current weather will be displayed
            customBox.empty();

            // Append the data to the customBox and display current weather
            customBox.append('<h2>' + city + ' (' + formattedDate + ')' + '</h2>');
            customBox.append('<img src="' + iconUrl + '" alt="Weather icon">');
            customBox.append('<p>Temp: ' + temperature + '°F</p>');
            customBox.append('<p>Humidity: ' + humidity + '%</p>');
            customBox.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
        });

    // This will fetch the forecast data for the next 5 days and display it in the card deck
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Loop through the list of forecasts
            for (var i = 0; i < data.list.length; i += 8) {
                var forecast = data.list[i];

                var date = dayjs();
                var formattedDate = date.format('M/D/YYYY');

                var iconUrl = "http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
                var temperature = Math.round(forecast.main.temp * 9/5 - 459.67);
                var humidity = forecast.main.humidity;
                var windSpeed = forecast.wind.speed;

                // Select the card for the day
                var card = $('.card').eq(i / 8);

                // Clear the card
                card.empty();

                // Append the forecast to the card
                card.append('<h5 class="card-title">' + formattedDate + '</h5>');
                card.append('<img class="weather-icon" src="' + iconUrl + '" alt="Weather icon">');
                card.append('<p>Temp: ' + temperature + '°F</p>');
                card.append('<p>Humidity: ' + humidity + '%</p>');
                card.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
            }
        });
});

var cityInput = $('#city-input');
var searchButton = $('#search-button');
var cityList = $('<ul>').attr('id', 'city-list').insertAfter(searchButton);

// Load the city names from local storage and display them
var cityNames = JSON.parse(localStorage.getItem('cityNames')) || [];
cityNames.forEach(function(city) {
    $('<li>').text(city).appendTo(cityList);
});

// Adds an event listener to the search button
searchButton.click(function() {
    // Get the city that the user has searched for
    var city = cityInput.val();
    cityNames.push(city);
    localStorage.setItem('cityNames', JSON.stringify(cityNames));
    // Create a list item for the city name and append it to the list
    $('<li>').text(city).appendTo(cityList);
});

// All of the above will let you search for a city and save it to your application.
// The following will allow you to re-click on previously searched cities and display the weather again.
$(document).on('click', '#city-list li', function() {
    var city = $(this).text();

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var weather = data.weather[0].description;
            var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temperature = data.main.temp;

            // Convert the temperature from Kelvin to Fahrenheit
            var temperature = Math.round(data.main.temp * 9/5 - 459.67);

            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            // Create a new Date object using Day.js
            var date = dayjs();
            var formattedDate = date.format('M/D/YYYY');
            
            customBox.empty();

            customBox.append('<h2>' + city + ' (' + formattedDate + ')' + '</h2>');
            customBox.append('<img src="' + iconUrl + '" alt="Weather icon">');
            customBox.append('<p>Temp: ' + temperature + '°F</p>');
            customBox.append('<p>Humidity: ' + humidity + '%</p>');
            customBox.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
        });

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Loop through the list of forecasts
            for (var i = 0; i < data.list.length; i += 8) {
                var forecast = data.list[i];

                var date = new Date(forecast.dt * 1000);
                var formattedDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();

                var iconUrl = "http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
                var temperature = forecast.main.temp;

                // Convert the temperature from Kelvin to Fahrenheit
                var temperature = Math.round(forecast.main.temp * 9/5 - 459.67);

                var humidity = forecast.main.humidity;
                var windSpeed = forecast.wind.speed;

                // Select the card for the day
                var card = $('.card').eq(i / 8);

                // Clear the card
                card.empty();

                // Append the forecast to the card
                card.append('<h5 class="card-title">' + formattedDate + '</h5>');
                card.append('<img class="weather-icon" src="' + iconUrl + '" alt="Weather icon">');
                card.append('<p>Temp: ' + temperature + '°F</p>');
                card.append('<p>Humidity: ' + humidity + '%</p>');
                card.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
            }
        });
});