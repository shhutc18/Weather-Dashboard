// 7af8b9762a8ee9fd0865deb0b51f559f API key (Weather)
var APIKey = "7af8b9762a8ee9fd0865deb0b51f559f";
var cityInput = $('#city-input');
var customBox = $('.custom-box');

// Adds an event listener to the search button
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
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            // Create a new Date object and format it
            var date = new Date();
            var formattedDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();

            // Clear the customBox
            customBox.empty();

            // Append the data to the customBox
            customBox.append('<h2>' + city + ' (' + formattedDate + ')' + '</h2>');
            customBox.append('<img src="' + iconUrl + '" alt="Weather icon">');
            customBox.append('<p>Temp: ' + temperature + '°F</p>');
            customBox.append('<p>Humidity: ' + humidity + '%</p>');
            customBox.append('<p>Wind Speed: ' + windSpeed + ' MPH</p>');
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
    // Get the city that the user has clicked on
    var city = $(this).text();

    // Fetch the weather data for the city and display it
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Extract the weather data from the response
            var weather = data.weather[0].description;

            // Display the weather data in the custom-box div
            customBox.text(weather);
        });
});