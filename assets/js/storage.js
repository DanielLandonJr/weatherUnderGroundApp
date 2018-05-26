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

// public methods
// return {
//   getLocationData: () => {
//     // any data in localstorage
//     if (localStorage.getItem('weatherUnderGround') === null) {
//       // localstorage empty, set to default values
//       city = defaultCity;
//       state = defaultState;
//     } else {
//       locationData = JSON.parse(localStorage.getItem('weatherUnderGround'));
//       city = locationData.city;
//       state = locationData.state;
//     }

//     return {
//       city,
//       state
//     };
//   },
//   setLocationData: (city, state) => {
//     // set weather object in localstorage
//     locationData = {
//       "city": city,
//       "state": state
//     };

//     localStorage.setItem('weatherUnderGround', JSON.stringify(locationData));
//   }
// }