# weatherdashboard

## https://zackmoscow.github.io/weatherdashboard/

## index.html
- used bootstrap
- everything here should be self-explanatory

## styles.css
- didn't use at all!

## scripts.js
- set searchHistory as global variable/array (this is important)
- loadHistory(): used reverse() function to reverse the array and make sure the most recent search parameter would load upon page refresh
- searchBtn click: push search value to searchHistory array, set local storage, run content generation functions
- updateHistory(): updates sidebar with new search input history
- currentWeather(): AJAX to access openweather API, set variables with applicable data format changes (utilizing moment.js for ease of translation), create and append dynamic content, export city latitude/longitude for getUV() function
- getUV(): pass through city lat/long from currentWeather() for a separate AJAX call, parse response data, if/else to format text color of UV index return, create and append dynamic content
- fiveDayForecast(): unique API call with original search input, use bootstrap card-deck component, for loop to access unique daily forecasts, create and append dynamic content
