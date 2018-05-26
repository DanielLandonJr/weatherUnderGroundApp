let city = '';
let state = '';
const defaultCity = 'new albany';
const defaultState = 'in';
let locationData = '';

export function getLocationData() {
  // any data in localstorage
  if (localStorage.getItem('weatherUnderGround') === null) {
    // localstorage empty, set to default values
    city = defaultCity;
    state = defaultState;

    // write to local storage for the first time. this will write the default data.
    setLocationData(city, state);
  } else {
    locationData = JSON.parse(localStorage.getItem('weatherUnderGround'));
    city = locationData.city;
    state = locationData.state;
  }

  return {
    city,
    state
  };
}

export function setLocationData(city, state)  {
  // set weather object in localstorage
  locationData = {
    "city": city,
    "state": state
  };

  localStorage.setItem('weatherUnderGround', JSON.stringify(locationData));
}