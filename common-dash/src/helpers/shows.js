import firebase from 'firebase'

//get shows
export const getShows = async (edition) => {
  const db = firebase.firestore()
  try {
  const showDocs = await db.collection('festival').doc(edition).collection(shows).get()
  const shows = showDocs.map((doc) => {return {id: doc.id, ...doc.data()}})
  console.log(shows);
    //array.sort --> array sort by start time
  return shows;
  } catch(e) {
  console.error(e)
  }
  }
// add show

//delete show

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
//this will cut down to only necessary updates
