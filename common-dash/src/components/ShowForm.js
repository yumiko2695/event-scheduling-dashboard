import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'


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

function ShowForm(props) {
  var subtitle;
  const {} = props

  const [modalIsOpen,setIsOpen] = React.useState(false);
  const openModal = () => {setIsOpen(true)}
  const afterOpenModal = () => {subtitle.style.color = '#f00'}
  const closeModal = () => {setIsOpen(false);}

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("");
  //const [name, setName] = useState("")
  const [country, setCountry] = useState("");
 // const [currents, setCurrents] = useState("");
  const [currentsID, setCurrentsID] = useState("");
  // uid == currentsID
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("")
 // const [profile, setProfile] = useState("")
  const [setLength, setSetLength] = useState("")
  const [stream, setStream] = useState("") // stream link
    //const [link, setLink] = useState(""); // stream link

  const [donate, setDonate] = useState("");
  const [room, setRoom] = useState("")
  const [created, setCreated] = useState("");
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("");
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [type, setType] = useState("")

  //use effect here to automatically put the rooms stream link here

  const [showData, setShowData] = useState(false);
  useEffect(() => {
    if(title) {setShowData({...showData, title: title})}
  }, [title])
  useEffect(() => {
    if(artist) {setShowData({...showData, artist: artist})}
  }, [artist])
  useEffect(() => {
    if(title) {setShowData({...showData, currentsID: currentsID})}
  }, [currentsID])
  useEffect(() => {
    if(description) {setShowData({...showData, description: description})}
  }, [description])
  useEffect(() => {
    if(email) {setShowData({...showData, email: email})}
  }, [email])
  useEffect(() => {
    if(image) {setShowData({...showData, image: image})}
  }, [image])
  useEffect(() => {
    if(stream) {setShowData({...showData, stream: stream})}
  }, [stream])
  useEffect(() => {
    if(country) {
      //calculate lat and long here
      setShowData({...showData, country: country})
    }
  }, [country])
  useEffect(() => {
    if(setLength) {
      //calculate start time and end time here
      setShowData({...showData, setLength: setLength})
    }
  }, [setLength])


  //handle create show
  //handle create

  return (
    <div>
    <div className="AddShowButton">
          <button onClick={openModal}>Add Show</button>
        </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <p ref={_subtitle => (subtitle = _subtitle)}>Add Show</p>
            <InputComponent text='title' value={title} func={setTitle} type='text' isNewShow={true}/>
            <InputComponent text='artist' value={artist} func={setArtist} type='text'isNewShow={true}/>
            <InputComponent text='set length' value={setLength} func={setSetLength} type='text'isNewShow={true} />
            <InputComponent text='streamLink' value={stream} func={setStream} type='text' isNewShow={true}/>
            <InputComponent text='email' value={email} func={setEmail} type='text' isNewShow={true}/>
            <InputComponent text='currents ID' value={currentsID} func={setCurrentsID} type='text' isNewShow={true}/>
            <InputComponent text='description' value={description} func={setDescription} type='text' rows="4" cols="50" isNewShow={true}/>
            <InputComponent text='location' value={country} func={setCountry} type='text' isNewShow={true}/>
            <InputComponent text='image' value={image} func={setImage} type='image' isNewShow={true}/>
            <button onClick={closeModal}>close</button>
          </Modal>
      </div>
  )
}

export default ShowForm;

