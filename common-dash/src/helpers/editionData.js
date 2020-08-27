import firebase from 'firebase'

//get rooms

export const getEditionData = async (edition) => {
  const db = firebase.firestore()
  try {
    const editionDoc = await db.collection("festival").doc(edition).get()
    const editionData = await editionDoc.data();
    console.log(editionData);
    return editionData;
  } catch(e) {
    console.error(e, 'in getroomdata')
    return 'ERROR'
  }
}

//add room
export const createRoom = async (edition, roomKey, roomData) => {
  const db = firebase.firestore()
try {
  let data = await db.collection('festival').doc(edition).get()
  let oldRooms = data.data().rooms
  let newRooms = [...oldRooms, roomKey]
  let oldOrganizers = data.data().organizers
  let newOrganizers = {...oldOrganizers, [roomKey]: roomData}
  await db.collection('festival').doc(edition).update({
  rooms: newRooms,
  organizers: newOrganizers
  })
} catch(e) {
  console.error(e, 'in createroom')
  return 'ERROR'
}
}

//delete room
export const deleteRoom = async (edition, roomKey) => {
  const db = firebase.firestore()
  try {
    let data = await db.collection('festival').doc(edition).get()
    let oldRooms = data.data().rooms
    let newRooms = [...oldRooms].filter(char => char !== roomKey);
    let oldOrganizers = data.data().organizers
    let newOrganizers = Object.keys(oldOrganizers).reduce((object, key) => {
      if (key !== roomKey) {
        object[key] = oldOrganizers[key]
      }
      return object
    }, {})
    await db.collection('festival').doc(edition).update({
    rooms: newRooms,
    organizers: newOrganizers
    })
  } catch(e) {
    console.error(e, 'in deleteroom')
    return 'ERROR'
  }
  }

  //edit room
  export const edutRoom = async (edition, roomKey, roomData) => {
    const db = firebase.firestore()
  try {
    let data = await db.collection('festival').doc(edition).get()
    let oldOrganizers = data.data().organizers
    let newOrganizers = {...oldOrganizers, [roomKey]: roomData}
    await db.collection('festival').doc(edition).update({
    organizers: newOrganizers
    })
  } catch(e) {
    console.error(e, 'in createroom')
    return 'ERROR'
  }
  }
