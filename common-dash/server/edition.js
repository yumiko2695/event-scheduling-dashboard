const router = require('express').Router()
const admin = require('firebase-admin');
//const app = admin.initializeApp();


module.exports = router

const {adminsOnly, currentUserOnly, adminOrCurrentUser} = require('./utils/utils')
const {getEditionData, createRoom, deleteRoom} = require('./utils/editionUtils')


router.get('/rooms', adminsOnly, async (req, res, next) => {
  try {
    const {edition} = req.params
    const rooms = await getEditionData(edition)
    res.send(rooms)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/createRoom', adminsOnly, async (req, res, next) => {
  try {
    const {edition, roomKey, roomData} = req.params
    const createRoomRes = await createRoom(edition, roomKey, roomData)
    if(createRoomRes !== 'ERROR') {
      res.send(createRoomRes)
    } else {
      console.log('error in create room')
    }
    next()
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/deleteRoom', adminsOnly, async (req, res, next) => {
  try {
    const {edition, roomKey} = req.params
    const deleteRoomRes = await deleteRoom(edition, roomKey)
    if(deleteRoomRes !== 'ERROR') {
      return res.send(deleteRoomRes)
    } else {
      console.log('error in delete room')
    }
    next()
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
