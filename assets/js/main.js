import * as Storage_Ctrl from './storage.js';
import * as UI_Ctrl from './ui.js';
import * as Weather_Ctrl from './weather.js';

const WeatherUnderground = (() => {
  // document load
  document.addEventListener('DOMContentLoaded', (event) => {
    // setup the modal so it will dispaly
    let elems = document.querySelector('.modal');
    let instances = M.Modal.init(elems);
  });

  let location = '';

  // load event listeners
  const loadEventListeners = () => {
    // set location when user clicks 'save changes' button
    document.querySelector('#setLocation').addEventListener('click', updateLocation);

    // clear fields for city/state when user opens the modal
    document.querySelector('.modal-trigger').addEventListener('click', () => {
      // clear fields
      document.querySelector('#city').value = '';
      document.querySelector('#state').value = '';
    });
  }

  const updateLocation = (event) => {
    event.preventDefault();

    let setCity = document.querySelector('#city').value;
    let setState = document.querySelector('#state').value;

    // validation checking, make sure fields are not empty
    if (setCity !== '' && setState !== '') {
      // update local storage
      Storage_Ctrl.Storage.setLocationData(setCity, setState);

      // get location data
      location = Storage_Ctrl.Storage.getLocationData();

      // get weather information
      getWeather(location.city, location.state);

      // close modal
      let elems = document.querySelector('.modal');
      let instances = M.Modal.getInstance(elems);
      instances.close();
    } else {
      // no values supplied
      M.toast({html: 'Please Supply a City and State.', classes: 'rounded'});

      // clear fields
      UI_Ctrl.UI.clearLocationFields();
    }
  };

  const getWeather = (city, state) => {
    const weather = Weather_Ctrl.Weather.getWeather(location.city, location.state)
      .then((response) => {
        if (response !== undefined) {
          // valid data returned

          // paint the ui with returned data
          UI_Ctrl.UI.paint(response);

          // show/hide valid data ui elements
          UI_Ctrl.UI.validDataReturn();
        } else {
          // invalid data returned
          M.toast({html: 'Invalid data returned from Weather Underground. Please set City & State location.', classes: 'rounded'});
          
          // show/hide invalid data ui elements
          UI_Ctrl.UI.invalidDataReturn();
        }
      })
      .catch((error) => { 
        console.log(error); 
      });
  }

  // public methods
  return {
    init: () => {
      // get location data
      location = Storage_Ctrl.Storage.getLocationData();

      // get weather information
      getWeather(location.city, location.state);

      // load event listeners
      loadEventListeners();
    }
  }
})();

WeatherUnderground.init();