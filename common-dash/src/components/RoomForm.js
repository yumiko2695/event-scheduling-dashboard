import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createRoom, editRoom, deleteRoom} from '../helpers/editionData'
//const edition = 'test';//FIXME this should be passed in

const roomFormStyle = {
  paddingTop: '5vh',
  paddingBottom: '10vh'
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')


function RoomForm(props) {
  var subtitle;
  const {getEdition, isNew, roomData, roomKey, roomsArr, edition} = props;

  //opening modal
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const openModal = () => {setIsOpen(true)}
  const afterOpenModal = () => {subtitle.style.color = '#f00'}
  const closeModal = () => {setIsOpen(false)}

  const [name, setName] = useState("");   //room name
  const [subName, setSubName] = useState("");   //collective name
  const [key, setKey] = useState("");   //room abbreviation
  const [location, setLocation] = useState("");   //location
  const [collective, setCollective] = useState("");   //collective id
  const [adminId, setAdminId] = useState("");   //adminId
  const [streamId, setStreamId] = useState("");   //streamID
  const [streamLink, setStreamLink] = useState("");   // streamlink
  const [roomStartTime, setRoomStartTime] = useState("");   // streamlink
  const [roomId, setRoomId] = useState("");   //room id



  //room + object of the all the values except the key
  const [room, setRoom] = useState(false);
  useEffect(() => {
    if(name) {setRoom({...room, name: name})}
  }, [name])
  useEffect(() => {
    if(location) {setRoom({...room, location: location})}
  }, [location])
  useEffect(() => {
    if(collective) {setRoom({...room, collective: collective})}
  }, [collective])
  useEffect(() => {
    if(subName) {setRoom({...room, subName: subName})}
  }, [subName])
  useEffect(() => {
  if(streamId) {setRoom({...room, streamId: streamId})}
}, [streamId])
useEffect(() => {
  if(streamLink) {setRoom({...room, streamLink: streamLink})}
}, [streamLink])
useEffect(() => {
  if(adminId) {setRoom({...room, adminId: adminId})}
}, [adminId])
useEffect(() => {
  if(roomStartTime) {setRoom({...room, roomStartTime: roomStartTime})}
}, [adminId])
  useEffect(() => {
    if(roomData) {
      setName(roomData.name)
      setSubName(roomData.subName)
      setLocation(roomData.location)
      setCollective(roomData.collective)
      setStreamId(roomData.streamId)
      setStreamLink(roomData.streamLink)
      setAdminId(roomData.adminId)
      setRoomStartTime(roomData.roomStartTime)
      setRoom(roomData)
    }
    if(roomsArr) {
      setRoomId(roomsArr.length)
    }
    if(roomKey) {
      setKey(roomKey)
    }
  }, [roomData, roomKey, roomsArr])
  const handleCreateRoom = async (edition, key, room) => {
    let newRoom = {...room, roomId: roomId}
      const data = await createRoom(edition, key, newRoom);
    if(data !== 'ERROR') {
      getEdition(edition)
      console.log('room was added')
      //function to refresh edition data!!!!!!
    } else {
      console.log('error in the add edition')
    }
  }
  const handleEditRoom = async (edition, key, room) => {
    const data = await editRoom(edition, key, room)
    if(data !== 'ERROR') {
      getEdition(edition)
      console.log('room was edited')
    } else {
      console.log('error in the edit edition')
    }
  }
  const handleDeleteRoom = async (edition, key) => {
    const data = await deleteRoom(edition, key);
    if(data !== 'ERROR') {
      getEdition(edition)
      console.log('room was deleted')
    } else {
      console.log('error in the edit edition')
    }
  }

  const handleSubmit = (evt) => {
    if(evt.target.value === 'delete') {
      handleDeleteRoom(edition, key)
    }
    else if(evt.target.value === 'submit edit') {
      handleEditRoom(edition, key, room)
    } else {
      handleCreateRoom(edition, key, room)
    }
    setName("")
    setSubName("")
    setKey("")
    setLocation("")
    setCollective("")
    setStreamId("")
    setStreamLink("")
    setAdminId("")
    setRoom(false)
    closeModal()
    evt.preventDefault()
}

  return (
    <div className="RoomForm">
      {isNew ? <button onClick={openModal}>Add Room</button> : <button onClick={openModal}>Edit Room</button>}
              <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              {isNew ? <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Room</h2> : <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Room</h2>}
              <form onSubmit={(event, isNew) => {handleSubmit(event, isNew)}} >
                <InputComponent text='Room Name' value={name} func={setName} isNewFormEntry={isNew.toString()} roomData={roomData}/>
                <InputComponent text='Collective Name' value={subName} func={setSubName} isNewFormEntry={isNew.toString()} roomData={roomData}/>
                {isNew ? <InputComponent text='Collective Abbreviation (ex. failed units --> FE)' value={key} func={setKey}  isNewFormEntry={isNew.toString()}/> : <></>}
                <InputComponent text="Location" value={location} func={setLocation} isNewFormEntry={isNew.toString()} roomData={roomData}/>
                <InputComponent value={collective} func={setCollective} text="Collective ID" isNewFormEntry={isNew.toString()} roomData={roomData}/>
                <InputComponent value={adminId} func={setAdminId} text="Admin ID" isNewFormEntry={isNew.toString()} roomData={roomData}/>
                <InputComponent value={streamId} func={setStreamId} text="Stream Key" isNewFormEntry={isNew.toString()} roomData={roomData}/>
                <InputComponent value={streamLink} func={setStreamLink} text="stream link" isNewFormEntry={isNew.toString()} roomData={roomData}/>
             {isNew ? <input type="submit" value="Submit" /> : <input type="submit" value="submit edit" />}
              {!isNew ? <input type="submit" value="delete" onClick={handleSubmit}/> : <></>}
              </form>
            </Modal>
    </div>
  )
}

export default RoomForm;
