import * as Storage_Ctrl from './storage.js';
import * as UI_Ctrl from './ui.js';
import * as Weather_Ctrl from './weather.js';

const WeatherUnderground = (() => {
  $(document).ready(function(){
    $('.modal').modal();
  });

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

    // clear fields
    document.querySelector('#city').textContent = '';
    document.querySelector('#state').textContent = '';

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
})();

WeatherUnderground.init();