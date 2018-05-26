const apiKey = '5a1b209e966659bb';

// public methods
export async function getWeather(city, state) {
    const response = await fetch(`http://api.wunderground.com/api/${ apiKey }/conditions/q/${ state }/${ city }.json`);
  
    const responseData = await response.json();
  
    return responseData.current_observation;
}