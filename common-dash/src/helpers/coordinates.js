const fetch = require('node-fetch')

export const getCoordinates = (location) => {
  let newLocation  = location.replace(/ /g, '+')
  console.log(newLocation)
    let body = JSON.stringify({
      cleanAddress: newLocation

    })
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/getGPSFromAddress/`, {
      method: 'post',
      headers: {
              'Content-Type': 'application/json',
              },
      body
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === 'OK') {
          let geolocation = {
            latitude: result.results[0].geometry.location.lat,
            longitude: result.results[0].geometry.location.lng,
          }
          return geolocation
        }
        return result
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}
