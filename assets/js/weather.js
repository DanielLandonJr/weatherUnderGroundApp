import * as API from './api_KEY.js';

// fetch the data from weather underground
export async function getWeather(city, state) {
    const response = await fetch(`http://api.wunderground.com/api/${ API.apiKey() }/conditions/q/${ state }/${ city }.json`);
  
    const responseData = await response.json();
  
    return responseData.current_observation;
}