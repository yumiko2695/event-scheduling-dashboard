import firebase from 'firebase'


//get shows
export const getShows = async (edition) => {
  const db = firebase.firestore()
  try {
  const showDocs = await db.collection('festival').doc(edition).collection('shows').get()
  const shows = showDocs.docs.map((doc) => {return {id: doc.id, ...doc.data()}})
  // let showsByRoom = {};
  // shows.map((show) => {
  //   if(showsByRoom[show.roomId]) {
  //     let roomArr = showsByRoom[show.roomId];
  //     showsByRoom[show.roomId] = [...roomArr, show]
  //   } else {
  //     showsByRoom[show.roomId] = [show]
  //   }
  //   return showsByRoom
  // })
  // Object.keys(showsByRoom).forEach(roomId => {
  //   let arr = showsByRoom[roomId]
  //   arr.sort((a, b) => {
  //     return b.startTime - a.startTime
  //   })
  //   showsByRoom[roomId] = arr;
  // })
  // return showsByRoom;
  console.log(shows)
    return shows;
  } catch(e) {
  console.error(e)
  }
}
//create show
export const createShow = async (edition, show) => {
  const db = firebase.firestore()
try {
  const showDocs = await db.collection('festival').doc(edition).collection('shows').add(show)
  console.log(showDocs)
} catch(e) {
  console.error(e, 'in create show')
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
  console.log(show, ' this is in eidt show')
  let data = await db.collection('festival').doc(edition).collection('shows').doc(id).get();
  let oldShowInfo = data.data()
  console.log('this is the data.data()', oldShowInfo)
  let newShow = {...oldShowInfo, ...show}
  await db.collection('festival').doc(edition).collection('shows').doc(id).update(newShow)
} catch(e) {
  console.error(e, 'in edot room')
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
