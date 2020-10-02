const fetch = require('node-fetch')

const getCoordinates = (location) => {
  const key = process.env.REACT_APP_POSITIONSTACK_KEY
  console.log('hellooo this is key', key )
  return fetch(`https://api.positionstack.com/v1/forward?access_key=${key}&query=${location}&output=json`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // if (result.status === 'OK') {
      //   let geolocation = {
      //     latitude: result.results[0].geometry.location.lat,
      //     longitude: result.results[0].geometry.location.lng,
      //   }
      //   return geolocation
      // }
      // return result
    })
    .catch((error) => {
      console.error('ERROR', error);
      return 'ERROR'
    });
}

module.exports = {getCoordinates}
