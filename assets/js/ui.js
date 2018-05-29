export const UI = (() => {
  // public methods
  return {
    paint: (weather) => {
      let wind_string = `Wind: From the ${ weather.wind_dir } @ ${ weather.wind_mph } MPH, Gusting to ${ weather.wind_gust_mph } MPH`;
      
      document.querySelector('#weather-location').textContent = weather.display_location.full;
      document.querySelector('#weather-description').textContent = weather.weather;
      document.querySelector('#weather-string').textContent = weather.temperature_string;
      document.querySelector('#weather-icon').setAttribute('src', weather.icon_url);
      document.querySelector('#weather-time').textContent = new Date();
      document.querySelector('#weather-humidity').textContent = `Relative Humidity: ${ weather.relative_humidity }`;
      document.querySelector('#weather-dewPoint').textContent = `Dew Point: ${ weather.dewpoint_string }`;
      document.querySelector('#weather-feelsLike').textContent = `Feels Like: ${ weather.feelslike_string }`;
      document.querySelector('#weather-wind').textContent = wind_string;
    },
    clearLocationFields: () => {
      document.querySelector('#city').value = "";
      document.querySelector('#state').value = '';
    },
    validDataReturn: () => {
      // change loading message
      document.querySelector('#loadingMessage').innerText = 'Loading ...';
      // hide load progress bar
      document.querySelector('#loadingDataBar').classList.add('hide');
      // show weather data
      document.querySelector('#displayWeatherData').classList.remove('hide');
      // show change location button
      document.querySelector('#changeLocation').classList.remove('hide');
    },
    invalidDataReturn: () => {
      // show loading bar
      document.querySelector('#loadingDataBar').classList.remove('hide');
      // hide weather data
      document.querySelector('#displayWeatherData').classList.add('hide');
      // show change location button
      document.querySelector('#changeLocation').classList.remove('hide');
      // change loading message
      document.querySelector('#loadingMessage').innerText = 'Invalid Data, please change location.';
    }
  }
})();