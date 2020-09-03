import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import RoomInputComponent from './InputRooms'
import {createRoom, editRoom, deleteRoom} from '../helpers/editionData'
//const edition = 'test';//FIXME this should be passed in

const roomFormStyle = {
  paddingTop: '5vh',
  paddingBottom: '10vh'
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  content : {
    color: 'white',
    backgroundColor: 'black',
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
  const {getEdition, edition, formType, roomData, roomKey, roomsArr, index} = props;
  console.log(formType)
  //opening modal
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const openModal = () => {setIsOpen(true)}
  const afterOpenModal = () => {subtitle.style.color = '#f00'}
  const closeModal = () => {setIsOpen(false)}

  const [roomId, setRoomId] = useState(roomKey);   //room id

  const [room, setRoom] = useState({...roomData});
  const [key, setKey] = useState(false);

  const handleChange = (event) => {
    if(event.target.name === 'roomStartTime') {
      console.log(event.target.value)
      console.log(new Date(event.target.value))
      setRoom({...room, [event.target.name]: new Date(event.currentTarget.value)})
    } else {
      setRoom({...room, [event.target.name]: event.currentTarget.value})
    }
  }

  const handleCreateRoom = async (edition, key, room) => {
    let newRoom = {...room, key: key}
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
  const handleDeleteRoom = async () => {
    const data = await deleteRoom(edition, roomKey);
    if(data !== 'ERROR') {
      getEdition(edition)
      console.log('room was deleted')
    } else {
      console.log('error in the edit edition')
    }
  }
  //FIXME consolidate the state and setter
  const handleSubmit = (evt) => {
    console.log(room)
    if(evt.target.value === 'delete') {
      handleDeleteRoom(edition, roomKey)
    }
    else if(evt.target.value === 'submit edit') {
      handleEditRoom(edition, roomKey, room)
    } else {
        handleCreateRoom(edition, key, room)
    }
    setRoom(false)
    setRoomId(false)
    setKey("")
    closeModal()
    evt.preventDefault()
}
  return (
    <div className="RoomForm">
      {formType === 'newRoom' ? <button onClick={openModal}>Add Room</button> : <button onClick={openModal}>Edit Room</button>}
              <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              {formType === 'newRoom' ? <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Room</h2> : <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Room</h2>}
              <form onSubmit={handleSubmit} >
                <RoomInputComponent text='Room Name' name='name' func={handleChange} formType={formType} roomData={roomData} value={room.name}/>
                <RoomInputComponent text='Collective Name' value={room.subName} name='subName' func={handleChange} formType={formType} roomData={roomData}/>
                {formType === 'newRoom' ? <RoomInputComponent text='Collective Abbreviation (ex. failed units --> FE)' value={key} func={setKey} name='key' formType={formType}/> : <></>}
                <RoomInputComponent text="Location" value={room.location} func={handleChange} name="location" formType={formType} roomData={roomData}/>
                <RoomInputComponent name="collective" value={room.collective} func={handleChange} text="Collective ID" formType={formType} roomData={roomData}/>
                <RoomInputComponent value={room.adminId} func={handleChange} name="adminId" text="Admin ID" formType={formType} roomData={roomData}/>
                <RoomInputComponent value={room.streamId} name="streamId" func={handleChange} text="Stream Key" formType={formType} roomData={roomData}/>
                <RoomInputComponent value={room.streamLink} name="streamLink" func={handleChange} text="stream link" formType={formType} roomData={roomData}/>
                <RoomInputComponent value={room.roomStartTime} name="roomStartTime" func={handleChange} isTime="roomTime" text="roomStartTime" roomData={roomData}/>
             {formType === 'newRoom' ? <input type="submit" value="Submit" /> : <input type="submit" value="submit edit" onClick={handleSubmit}/> }
              {formType !== 'newRoom' ? <input type="submit" value="delete" onClick={handleSubmit}/> : <></>}
              </form>
            </Modal>
    </div>
  )
}

export default RoomForm;
