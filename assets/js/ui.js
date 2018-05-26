let wind_string = '';

// public methods
export function paint(weather) {
    document.querySelector('#weather-location').textContent = weather.display_location.full;
    document.querySelector('#weather-description').textContent = weather.weather;
    document.querySelector('#weather-string').textContent = weather.temperature_string;
    document.querySelector('#weather-icon').setAttribute('src', weather.icon_url);
    document.querySelector('#weather-time').textContent = new Date();
    document.querySelector('#weather-humidity').textContent = `Relative Humidity: ${ weather.relative_humidity }`;
    document.querySelector('#weather-dewPoint').textContent = `Dew Point: ${ weather.dewpoint_string }`;
    document.querySelector('#weather-feelsLike').textContent = `Feels Like: ${ weather.feelslike_string }`;
    wind_string = `Wind: From the ${ weather.wind_dir } @ ${ weather.wind_mph } MPH, Gusting to ${ weather.wind_gust_mph } MPH`;
    document.querySelector('#weather-wind').textContent = wind_string;
}