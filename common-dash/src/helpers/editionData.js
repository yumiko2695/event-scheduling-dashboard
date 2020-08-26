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


//delete room

