$(document).ready(function(){
  $('.modal').modal();
});

const Storage_Ctrl = (() => {
  let city = '';
  let state = '';
  const defaultCity = 'new albany';
  const defaultState = 'in';
  let locationData = '';

  // public methods
  return {
    getLocationData: () => {
      // any data in localstorage
      if (localStorage.getItem('weatherUnderGround') === null) {
        // localstorage empty, set to default values
        city = defaultCity;
        state = defaultState;
      } else {
        locationData = JSON.parse(localStorage.getItem('weatherUnderGround'));
        city = locationData.city;
        state = locationData.state;
      }

      return {
        city,
        state
      };
    },
    setLocationData: (city, state) => {
      // set weather object in localstorage
      locationData = {
        "city": city,
        "state": state
      };

      localStorage.setItem('weatherUnderGround', JSON.stringify(locationData));
    }
  }
})();

const UI_Ctrl = (() => {
  let wind_string = '';

  // public methods
  return {
    paint: (weather) => {
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
  }
})();

const Weather_Ctrl = (() => {
  const apiKey = '5a1b209e966659bb';

  // public methods
  return {
    getWeather: async (city, state) => {
      const response = await fetch(`http://api.wunderground.com/api/${ apiKey }/conditions/q/${ state }/${ city }.json`);

      const responseData = await response.json();

      return responseData.current_observation;
    }
  }
})();

const App = ((Storage_Ctrl, UI_Ctrl, Weather_Ctrl) => {
  let location = '';
  let setCity = '';
  let setState = '';

  // load event listeners
  const loadEventListeners = () => {
    document.querySelector('#setLocation').addEventListener('click', updateLocation);
  }

  const updateLocation = (event) => {
    event.preventDefault();

    console.log('click');
    // update local storage
    setCity = document.querySelector('#city').value;
    setState = document.querySelector('#state').value;
    Storage_Ctrl.setLocationData(setCity, setState);

    // get location data
    location = Storage_Ctrl.getLocationData();

    // get weather information
    getWeather(location.city, location.state);

    // close modal
    $('#modal1').modal('close');
  };

  const getWeather = (city, state) => {
    const weather = Weather_Ctrl.getWeather(location.city, location.state)
      .then((response) => UI_Ctrl.paint(response))
      .catch((error) => console.log(error));
  }

  // public methods
  return {
    init: () => {
      // get location data
      location = Storage_Ctrl.getLocationData();

      // get weather information
      getWeather(location.city, location.state);

      // load event listeners
      loadEventListeners();
    }
  }
})(Storage_Ctrl, UI_Ctrl, Weather_Ctrl);

// initialize the application
App.init();