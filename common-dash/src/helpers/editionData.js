import firebase from 'firebase'

//get rooms
export const getEditionData = async (edition) => {
  const db = firebase.firestore()
  try {
    console.log(edition)
    const editionDoc = await db.collection("festival").doc(edition).get()
    console.log(editionDoc)
    const editionData = await editionDoc.data();
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
  let newOrganizers = {...oldOrganizers, [roomKey]: {...roomData}}
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
    console.log(oldRooms)
    let newRooms = [...oldRooms].reduce((accumulator, currentVal) => {
      if(currentVal !== roomKey) {
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
  export const editRoom = async (edition, roomKey, roomData) => {
    const db = firebase.firestore()
  try {
    console.log(edition, roomKey, roomData)
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
