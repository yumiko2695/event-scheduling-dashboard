const router = require('express').Router()
//const app = admin.initializeApp();


module.exports = router

const {getCoordinates} = require('./utils/coordinatesUtils')


router.get('/', async (req, res, next) => {
  try {
    //const location = {req.body}
    const location = 'new york'
    let coordinates = await getCoordinates(location)
    if(coordinates !== 'ERROR') {
      console.log(coordinates)
      res.send(coordinates)
    } else {
      res.send('error in coordinates')
    }
    next(e)
  } catch(e) {
    console.log(e)
    next(e)
  }
})


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
