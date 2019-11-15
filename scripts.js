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
        console.log(response);
        var cityName = response.name;
        var cityDate = response.dt;
            //NOTE: unix, UTC
        var cityTime = response.timezone;
            //NOTE: local difference in seconds from UTC
        var cityCondition = response.weather.main;
            //NOTE: need to research all possible codes
        var cityHumidity = response.main.humidity;     
        var cityWindSpeed = response.wind.speed;
            //NOTE: meters/sec, needs converted
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        getUV(cityLat, cityLon);
      });
    };

    function getUV(cityLat, cityLon) {
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=836ffc3974d6b7a17c9acd37053e9f61&lat=" + cityLat + "&lon=" + cityLon;
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        var cityUV = response.value;
        console.log("UV: " + cityUV)
      }
    )};

    function fiveDayForecast (search) {
      var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
      search + "&APPID=836ffc3974d6b7a17c9acd37053e9f61";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (i = 4; i < 37; i += 8) {
        var cityDate = response.list.dt;
          //NOTE NEEDS SAME CONVERSION AS ABOVE
        var cityCondition = response.list.weather.main;
          //NOTE NEEDS same research on total conditions as above
        var cityTemp = response.list.main.temp;
          //NOTE needs kelvin conversion
        var cityHumidity = response.list.main.humidity;
      }
    });
  };
});

