const admin = require('firebase-admin')
//get rooms
const getEditionData = async (edition) => {
  const db = admin.firestore()
  try {
    const editionDoc = await db.collection("festival").doc(edition).get()
    const editionData = await editionDoc.data();
    return editionData;
  } catch(e) {
    console.error(e, 'in getroomdata')
    return 'ERROR'
  }
}

//add room
const createRoom = async (edition, roomKey, roomData) => {
  const db = admin.firestore()
try {
  let data = await db.collection('festival').doc(edition).get()
  let oldRooms = data.data().rooms
  let newsRooms
  if(oldRooms === undefined) {
    newRooms = [roomKey]

  } else {
    newRooms = [...oldRooms, roomKey]
  }
  let oldOrganizers = data.data().organizers
  let newOrganizers = {...oldOrganizers, [roomKey]: {...roomData}}
  await db.collection('festival').doc(edition).update({
  rooms: newRooms,
  organizers: newOrganizers
  })
  return 'room created'
} catch(e) {
  console.error(e, 'in createroom')
  return 'ERROR'
}
}

//delete room
const deleteRoom = async (edition, roomKey) => {
  const db = admin.firestore()
  try {
    let data = await db.collection('festival').doc(edition).get()
    let oldRooms = data.data().rooms
    let newRooms = [...oldRooms].reduce((accumulator, currentVal) => {
      if(currentVal !== Number(roomKey)) {
        accumulator.push(currentVal)
      }
      return accumulator
    }, []);
    console.log(newRooms)
    let oldOrganizers = data.data().organizers
    let newOrganizers = Object.keys(oldOrganizers).reduce((object, key) => {
      if (key !== roomKey) {
        object[key] = oldOrganizers[key]
      }
      return object
    }, {})
    console.log(newOrganizers)
    await db.collection('festival').doc(edition).update({
    rooms: newRooms,
    organizers: newOrganizers
    })
    return db.collection('festival').doc(edition).get()
  } catch(e) {
    console.error(e, 'in deleteroom')
    return 'ERROR'
  }
  }

  //edit room
const editRoom = async (edition, roomKey, roomData) => {
    const db = admin.firestore()
  try {
    let data = await db.collection('festival').doc(edition).get()
    let oldOrganizers = data.data().organizers
    let oldRoom = oldOrganizers[roomKey]
    let newOrganizers = {...oldOrganizers, [roomKey]: {...oldRoom, ...roomData}}
    await db.collection('festival').doc(edition).update({
    organizers: newOrganizers
    })
  } catch(e) {
    console.error(e, 'in editroom')
    return 'ERROR'
  }
  }

  module.exports = {getEditionData, createRoom, deleteRoom, editRoom}
