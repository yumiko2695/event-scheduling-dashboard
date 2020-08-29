import axios from 'axios'
const fetch = require('node-fetch')
const endpoint = process.env.REACT_APP_BACKEND_URL


// export const getCoordinates = async (location) => {
//   try {
//     let request = {body: location}
//     console.log(endpoint, 'this is the endpoint')
//     console.log(location, 'this is the llocaton')
//     let coordinates = await axios.post(`${endpoint}/getGPSFromAddress`, request);
//     console.log(coordinates);
//     console.log('got coordinates')
//     return coordinates;
//   } catch(e) {
//     console.error(e)
//   }
// }

export const getCoordinates = async (location) => {
  try {
    const body = JSON.stringify({
      location, //string that someone searches
    })
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getGPSFromAddress`, {
      method: 'post',
      headers: {
                  'Content-Type': 'application/json',
              },
      body,
      })
    if (response.status === 'OK') {
        let geolocation = {
      latitude: response.results[0].geometry.location.lat,
      longitude: response.results[0].geometry.location.lng,
    }
    return geolocation;
  }
  } catch(e) {
    console.error(e)
  }

}
