$(document).ready(function() {

    // var searchHistory = [];

    $("#searchBtn").on('click', function() {
        var search = $(this).prev().val();
        // searchHistory = JSON.parse(localStorage.getItem("searches")) || [];
        // searchHistory.push(search);
        // localStorage.setItem("searches", JSON.stringify(searchHistory));
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

          getUV(cityLat, cityLon);

          var currentWeatherDiv = $("<div>")
            currentWeatherDiv.attr("id", "current");
          var weatherIcon = $("<img>");
            weatherIcon.attr("src", iconURL);
            weatherIcon.css("float", "right");
          var headline = $("<h2>" + cityName + ' (' + cityDate + ') ' + "</h2>");
          currentWeatherDiv.append(headline);
          headline.append(weatherIcon);
          currentWeatherDiv.append(cityTemp);
          currentWeatherDiv.append(cityHumidity);
          currentWeatherDiv.append(cityWindSpeed);
          $("#current").append(currentWeatherDiv);
          });
    };

    function getUV(cityLat, cityLon) {
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=836ffc3974d6b7a17c9acd37053e9f61&lat=" + cityLat + "&lon=" + cityLon;
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function(response) {
          var cityUV = $("<p>").text("UV Index: " + response.value);
          $("#current").append(cityUV);
        });
    };

    function fiveDayForecast (search) {
      var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
      search + "&APPID=836ffc3974d6b7a17c9acd37053e9f61";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $("#fiveDayHead").append("<h3> Five Day Forecast: </h3>")
        for (i = 5; i < 38; i += 8) {
          var updatedTime = moment.unix(response.list[i].dt + response.city.timezone).format("MM/DD/YYYY");
          var iconURL = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
          var cityTemp = $("<p>").text("Temp: " + (((response.list[i].main.temp * 9) / 5) - 459.67).toFixed(0) + "°F");
          var cityHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

          var fiveDayDiv = $("<div>");
            fiveDayDiv.attr("class", "card");
          var fiveDayIcon = $("<img>");
            fiveDayIcon.attr("src", iconURL);
          
          fiveDayDiv.append(updatedTime);
          fiveDayDiv.append(fiveDayIcon);
          fiveDayDiv.append(cityTemp);
          fiveDayDiv.append(cityHumidity);
          $("#fiveDay").append(fiveDayDiv);

          //NOTE need to use bootstrap carddeck functionality for this
          // <div class="card">
          //   <img src="..." class="card-img-top" alt="...">
          //   <div class="card-body">
          //     <h5 class="card-title">Card title</h5>
          //     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          //   </div>
          //   <div class="card-footer">
          //     <small class="text-muted">Last updated 3 mins ago</small>
          //   </div>
          // </div>
        }
      });
    }

    function getIcon (cityCondition) {

    }
  
  });

