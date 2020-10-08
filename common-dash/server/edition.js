const router = require('express').Router()
const admin = require('firebase-admin');
//const app = admin.initializeApp();


module.exports = router

const {adminsOnly, currentUserOnly, adminOrCurrentUser, roomAdminOnly} = require('./utils/utils')
const {getEditionData, createRoom, deleteRoom, editRoom} = require('./utils/editionUtils')


router.get('/rooms', async (req, res, next) => {
  try {
    const {edition} = req.query
    const rooms = await getEditionData(edition)
    res.send(rooms)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/deleteRoom', roomAdminOnly, async (req, res, next) => {
  try {
    const {edition, roomKey} = req.query
    const deleteRoomRes = await deleteRoom(edition, roomKey)
    if(deleteRoomRes !== 'ERROR') {
      res.send(deleteRoomRes)
    } else {
      console.log('error in delete room')
    }
    next()
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.post('/editRoom', roomAdminOnly, async (req, res, next) => {
  try {
    const {edition, roomKey, roomData} = req.body
    const editRoomRes = await editRoom(edition, roomKey, roomData)
    if(editRoomRes !== 'ERROR') {
      res.send(editRoomRes)
    } else {
      console.log('error in delete room')
    }
    next()
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.post('/createRoom', roomAdminOnly, async (req, res, next) => {
  try {
    const {edition, roomKey, roomData} = req.body
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



router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
