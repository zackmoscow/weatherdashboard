$(document).ready(function() {

    var searchHistory = {};
    searchHistory = JSON.parse(localStorage.getItem("searches")) || [];

    $("#searchBtn").on('click', function() {
        var search = $(this).prev().val();
        searchHistory.push(search);
        localStorage.setItem("searches", JSON.stringify(searchHistory));
        currentWeather(search);
        fiveDayForecast(search);
    });

    function currentWeather (search) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
        search + "&APPID=836ffc3974d6b7a17c9acd37053e9f61";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
          var cityName = response.name;
          var cityDate = moment.unix(response.dt + response.timezone).format("MM/DD/YYYY");
          var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
          var cityTemp = $("<p>").text("Temperature: " + (((response.main.temp * 9) / 5) - 459.67).toFixed(0) + "°F");
          var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");     
          var cityWindSpeed = $("<p>").text("Wind Speed: " + (response.wind.speed * 2.2369).toFixed(0) + " MPH");
          var cityLat = response.coord.lat;
          var cityLon = response.coord.lon;

          var currentWeatherDiv = $("<div>")
            currentWeatherDiv.attr("id", "current").attr("class", "border border-secondary");
          var weatherIcon = $("<img>");
            weatherIcon.attr("src", iconURL);
          var headline = $("<h2>" + cityName + ' (' + cityDate + ') ' + "</h2>");
            headline.attr("class", "ml-3 mt-3");
            cityTemp.attr("class", "ml-3 mt-3");
            cityHumidity.attr("class", "ml-3");
            cityWindSpeed.attr("class", "ml-3");
          currentWeatherDiv.append(headline);
          headline.append(weatherIcon);
          currentWeatherDiv.append(cityTemp);
          currentWeatherDiv.append(cityHumidity);
          currentWeatherDiv.append(cityWindSpeed);
          $("#current").replaceWith(currentWeatherDiv);

          getUV(cityLat, cityLon);
          });
    };

    function getUV(cityLat, cityLon) {
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=836ffc3974d6b7a17c9acd37053e9f61&lat=" + cityLat + "&lon=" + cityLon;
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function(response) {
          var cityUVRaw = JSON.parse(response.value);
          console.log(cityUVRaw);
          var cityUV = $("<span>").text(cityUVRaw);
            if (cityUVRaw < 3) {
              cityUV.css("color", "green");
            } else if (cityUVRaw >= 3 && cityUVRaw < 6) {
              cityUV.css("color", "orange");
            } else if (cityUVRaw >= 6 && cityUVRaw <= 8) {
              cityUV.css("color", "red");
            } else {
              cityUV.css("color", "maroon");
            }
            var cityUVDisplay = $("<p>").text("UV Index: ")
            cityUVDisplay.attr("class", "ml-3")
            cityUVDisplay.append(cityUV);
          $("#current").append(cityUVDisplay);
        });
    };

    function fiveDayForecast (search) {
      var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
      search + "&APPID=836ffc3974d6b7a17c9acd37053e9f61";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var headline = $("<h3>").text("Five Day Forecast:");
          $("#fiveDayHead").replaceWith(headline);
        var newFiveDay = $("<div>");
          newFiveDay.attr("id", "fiveDay").attr("class", "card-deck");
        $("#fiveDay").replaceWith(newFiveDay);
        for (i = 6; i < 39; i += 8) {
          var updatedTime = $('<p class="mt-2">').text(moment.unix(response.list[i].dt + response.city.timezone).format("MM/DD/YYYY"));
            updatedTime.css("text-align", "center");
            updatedTime.css("font-weight", "bold");
          var iconURL = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
          var cityTemp = $("<p>").text("Temp: " + (((response.list[i].main.temp * 9) / 5) - 459.67).toFixed(0) + "°F");
          var cityHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

          var fiveDayDiv = $("<div>");
            fiveDayDiv.attr("class", "card bg-light");
          var fiveDayIcon = $("<img>");
            fiveDayIcon.attr("src", iconURL);
          
          fiveDayDiv.append(updatedTime);
          fiveDayDiv.append(fiveDayIcon);
          fiveDayDiv.append(cityTemp);
          fiveDayDiv.append(cityHumidity);
          $("#fiveDay").append(fiveDayDiv);
        }
      });
    }
  });

