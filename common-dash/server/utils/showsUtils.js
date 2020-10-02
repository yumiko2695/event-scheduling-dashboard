const firebase = require('firebase')


//get shows
const getShows = async (edition) => {
  const db = firebase.firestore()
  try {
  const showDocs = await db.collection('festival').doc(edition).collection('shows').get()
  const shows = showDocs.docs.map((doc) => {return {id: doc.id, ...doc.data()}})
  console.log(shows)
    return shows;
  } catch(e) {
  console.error(e)
  }
}
//create show
const createShow = async (edition, show) => {
  const db = firebase.firestore()
try {
  const showDocs = await db.collection('festival').doc(edition).collection('shows').add(show)
  console.log(showDocs)
  return 'show created'
} catch(e) {
  console.error(e, 'in create show')
  return 'ERROR'
}
}
//delete show
const deleteShow = async (edition, showId) => {
  const db = firebase.firestore()
try {
  const res = await db.collection('festival').doc(edition).collection('shows').doc(showId).delete()
  return res;
} catch(e) {
  console.error(e, 'in createroom')
  return 'ERROR'
}
}
// edit show
const editShow = async (edition, show, id) => {
  const db = firebase.firestore()
try {
  console.log(show, ' this is in eidt show')
  let data = await db.collection('festival').doc(edition).collection('shows').doc(id).get();
  let oldShowInfo = data.data()
  console.log('this is the data.data()', oldShowInfo)
  let newShow = {...oldShowInfo, ...show}
  await db.collection('festival').doc(edition).collection('shows').doc(id).update(newShow)
  return 'show edited'
} catch(e) {
  console.error(e, 'in edot room')
  return 'ERROR'
}
}

module.exports = {getShows, createShow, deleteShow, editShow}
