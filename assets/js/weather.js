import * as API from './api_KEY.js';

export const Weather = (() => {
  // public methods
  return {
    // fetch the data from weather underground
    getWeather: async (city, state) => {
      let fetchURL = `http://api.wunderground.com/api/${ API.apiKey() }/conditions/q/${ state }/${ city }.json`;
      
      const response = await fetch(fetchURL);

      const responseData = await response.json();

      return responseData.current_observation;
    }
  }
})();