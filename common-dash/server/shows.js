const router = require('express').Router()
const admin = require('firebase-admin');
//const app = admin.initializeApp();


module.exports = router

const {adminsOnly, currentUserOnly, adminOrCurrentUser} = require('./utils/utils')
const {getShows, createShow, deleteShow, editShow} = require('./utils/showsUtils')


router.get('/shows', adminsOnly, async (req, res, next) => {
  try {
    const {edition} = req.params
    const rooms = await getShows(edition)
    res.send(rooms)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/createShow', adminsOnly, async (req, res, next) => {
  try {
    const {edition, show} = req.params
    const createShowRes = await createShow(edition, show)
    if(createShowRes !== 'ERROR') {
      res.send(createShowRes)
    } else {
      console.log('error in create show')
    }
    next()
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/deleteShow', adminsOnly, async (req, res, next) => {
  try {
    const {edition, showId} = req.params
    const deleteShowRes = await deleteShow(edition, showId)
    if(deleteShowRes !== 'ERROR') {
      res.send(deleteShowRes)
    } else {
      console.log('error in delete show')
    }
    next()
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.get('/editShow', adminsOnly, async (req, res, next) => {
  try {
    const {edition, show, id} = req.params
    const editShowRes = await editShow(edition, show, id)
    if(editShowRes !== 'ERROR') {
      res.send(editShowRes)
    } else {
      console.log('error in edit show')
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
