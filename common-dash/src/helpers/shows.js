import firebase from 'firebase'
import axios  from 'axios'


//get shows
export const getShows = async (edition) => {
  const db = firebase.firestore()
  try {
  const showDocs = await db.collection('festival').doc(edition).collection("shows").get()
  const shows = showDocs.map((doc) => {return {id: doc.id, ...doc.data()}})
  console.log(shows);
    //array.sort --> array sort by start time
  return shows;
  } catch(e) {
  console.error(e)
  }
  }
// add show
export const createShow = async (edition, show) => {
try {
  let request = {
    data: show,
    festId: edition
  }
  const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fest/submitApprovedCommonStream`, request);
  console.log(res);
  return res;
} catch(e) {
  console.error(e, 'in createroom')
  return 'ERROR'
}
}
//delete show
export const deleteShow = async (edition, showId) => {
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
export const editShow = async (edition, show, id) => {
  const db = firebase.firestore()
try {
  const id = show.id;
  const oldShow = await db.collection('festival').doc(edition).collection('shows').doc(id).get();
  const newShow = {...oldShow, ...show}
  const show = await db.collection('festival').doc(edition).collection('shows').doc(id).update(newShow)
  return show;
} catch(e) {
  console.error(e, 'in createroom')
  return 'ERROR'
}
}
//DRAG AND DROP / CHANGE TIMES
//order is start time
//ordered
//item splice out, and splice in - shifting order
//call calulate start
// for loop through array (room's start time, first items length to get 2nd items start time)
//store in database (update)

//moving show up by one
// from index and to index = math.min()
//min in for loop
// //this will cut down to only necessary updates
