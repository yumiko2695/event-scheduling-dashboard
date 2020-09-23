import React, {useState} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createRoom, editRoom, deleteRoom} from '../helpers/editionData'
import inputConfigRoom from './inputConfigRoom.json'

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

  //opening modal
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const openModal = () => {setIsOpen(true)}
  const afterOpenModal = () => {subtitle.style.color = '#f00'}
  const closeModal = () => {setIsOpen(false)}


  const [room, setRoom] = useState({...roomData});

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
    console.log(room)
    const data = await createRoom(edition, room.key, room);
    if(data !== 'ERROR') {
      getEdition(edition)
      setRoom(false)
      closeModal()
      console.log('room was added')
      //function to refresh edition data!!!!!!
    } else {
      console.log('error in the add edition')
    }
  }
  const handleEditRoom = async (edition, key, room) => {
    const data = await editRoom(edition, roomKey, room)
    if(data !== 'ERROR') {
      getEdition(edition)
      setRoom(false)
      closeModal()
      console.log('room was edited')
    } else {
      console.log('error in the edit edition')
    }
  }
  const handleDeleteRoom = async () => {
    const data = await deleteRoom(edition, roomKey);
    if(data !== 'ERROR') {
      getEdition(edition)
      setRoom(false)
      closeModal()
      console.log('room was deleted')
    } else {
      console.log('error in the edit edition')
    }
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
              {inputConfigRoom.map((inputProps, index) => (<InputComponent {...inputProps} fieldData={room[inputProps.field]} func={handleChange} key={index}/>))}
             {formType === 'newRoom' ? <input type="submit" value="Submit" onClick={() => {handleCreateRoom(edition, roomKey, room)}} /> : <input type="submit" value="submit edit" onClick={() => {handleEditRoom(edition, roomKey, room)}}/> }
              {formType !== 'newRoom' ? <input type="submit" value="delete" onClick={() => {handleDeleteRoom(edition, roomKey)}}/> : <></>}
            </Modal>
    </div>
  )
}

export default RoomForm;
