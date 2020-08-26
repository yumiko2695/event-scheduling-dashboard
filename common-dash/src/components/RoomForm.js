import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createRoom} from '../helpers/editionData'
const edition = 'test';



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

function sample(text) {
  console.log(text)
}

Modal.setAppElement('#root')

function RoomForm(props) {
  var subtitle;
  const {jsonData} = props

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
  //room + object of the all the values except the key
  const [room, setRoom] = useState(false);
  useEffect(() => {             //updates room object in state with values
    if(name) {setRoom({...room, name: name})}
    if(subName) {setRoom({...room, subName: subName})}
    if(location) {setRoom({...room, location: location})}
    if(collective) {setRoom({...room, collective: collective})}
    console.log(room);
  }, [name, subName, location, collective])

  const handleCreateRoom = async (edition, key, room) => {
      const data = await createRoom(edition, key, room);
    if(data !== 'ERROR') {
      console.log('room was added')
    } else {
      console.log('error in the add edition')
    }
  }

  const handleSubmit = (evt) => {
    handleCreateRoom(edition, key, room)
    setName("")
    setSubName("")
    setKey("")
    setLocation("")
    setCollective("")
    closeModal()
    evt.preventDefault()
}
  return (
    <div className="RoomForm">
      <button onClick={openModal}>Add Room</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Room</h2>
          <form onSubmit={handleSubmit}>
            <InputComponent text="" value={name} func={setName} type="Room Name" isNewFormEntry={true}/>
            <InputComponent text="" value={subName} func={setSubName} type="Collective Name" isNewFormEntry={true}/>
            <InputComponent text="" value={key} func={setKey} type="Collective Abbreviation (ex. failed units --> FE)" isNewFormEntry={true}/>
            <InputComponent text="" value={location} func={setLocation} type="Location" isNewFormEntry={true}/>
            <InputComponent text="" value={collective} func={setCollective} type="Collective ID" isNewFormEntry={true}/>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={closeModal}>close</button>
        </Modal>
    </div>
  )
}

export default RoomForm;
