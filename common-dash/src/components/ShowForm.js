import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createShow} from '../helpers/shows'
import {getCoordinates} from '../helpers/coordinates'
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

Modal.setAppElement('#root')

function ShowForm(props) {
  var subtitle;
  const {roomData, getShows, isNew, shows, show} = props

  const [modalIsOpen,setIsOpen] = React.useState(false);
  const openModal = () => {setIsOpen(true)}
  const afterOpenModal = () => {subtitle.style.color = '#f00'}
  const closeModal = () => {setIsOpen(false);}

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("");
  const [country, setCountry] = useState("");
  const [currentsID, setCurrentsID] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const [stream, setStream] = useState("")

  // const [donate, setDonate] = useState("");
   const [room, setRoom] = useState("")
  // const [created, setCreated] = useState("");

  // const [lat, setLat] = useState("")
  // const [lon, setLon] = useState("")
  // const [type, setType] = useState("")

  //use effect here to automatically put the rooms stream link here

  const [showData, setShowData] = useState({type: 'single'});
  useEffect(() => {
    if(title) {setShowData({...showData, title: title})}
  }, [title])
  useEffect(() => {
    if(artist) {setShowData({...showData, artist: artist, name: artist})}
  }, [artist])
  useEffect(() => {
    if(currentsID) {setShowData({...showData, currentsID: currentsID, profile: currentsID})}
  }, [currentsID])
  useEffect(() => {
    if(description) {setShowData({...showData, description: description})}
  }, [description])
  useEffect(() => {
    if(email) {setShowData({...showData, email: email})}
  }, [email])
  useEffect(() =>    {
    if(image) {setShowData({...showData, image: image})}
  }, [image])
  useEffect(() => {
    if(stream) {setShowData({...showData, stream: stream, link: stream})}
  }, [stream])
  useEffect( () => {
    if(country) {
      setShowData({...showData, country: country})

    }
  }, [country])
  useEffect(() => {
    if(startTime) {
      //calculate start time and end time here
      setShowData({...showData, startTime: startTime})
    }
  }, [startTime])
  useEffect(() => {
    if(endTime) {
      //calculate start time and end time here
      setShowData({...showData, endTime: endTime})
    }
  }, [endTime])
  useEffect(() => {
    if(roomData) {
      setRoom(roomData.roomId)
    }
  }, [roomData])
  useEffect(() => {
    if(show) {
      setTitle(show.title)
      setArtist(show.artist)
      setCountry(show.country)
      setCurrentsID(show.currentsID)
      setDescription(show.description)
      setEmail(show.email)
      setImage(show.image)
      setStartTime(show.startTime)
      setEndTime(show.endTime)
    }
  }, [roomData])
  //handle create show
  const handleCreateShow = async (edition, show) => {
    // let location = showData.country.replace(/ /g, '+')
    // const coordinates = await getCoordinates(location)
    // lat: coordinates.latitude, lon: coordinates.longitude,
    let newShow = {...show, roomId: room}
    console.log(newShow)
    const data = await createShow(edition, newShow);
  if(data !== 'ERROR') {
    getShows(edition);
    console.log('room was added')
    console.log(shows);
    //function to refresh edition data!!!!!!
  } else {
    console.log('error in the add edition')
  }
}
  const handleSubmit = (evt) => {
    console.log('helllo ', evt.target.value)
    evt.preventDefault()
    // if(evt.target.value === 'delete') {
    //   handleDeleteShow(edition, key)
    // }
    // if(evt.target.value === 'submit edit') {
    //   handleEditShow(edition, room)
    // } else {
      if(evt.target.value === 'submit') {
      handleCreateShow(edition, showData);
    }
    setTitle("")
    setArtist("")
    setCurrentsID("")
    setCountry("")
    setDescription("")
    setEmail("")
    setImage("")
    setStartTime("")
    setEndTime("")
    setStream("")
    setRoom("")
    setShowData({type: 'string'})
    closeModal()
}
  return (
    <div>
      <div className="AddShowButton">
      {isNew ? <button onClick={openModal}>Add Show</button> : <button onClick={openModal}> Edit</button>}

        </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          {isNew ? <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Show</h2> : <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Show</h2>}
            <form onSubmit={handleSubmit} >
            <InputComponent text='title' value={title} func={setTitle} type='text' isNewShow={isNew}/>
            <InputComponent text='artist' value={artist} func={setArtist} type='text'isNewShow={isNew}/>
            <InputComponent text='start time' value={startTime} func={setStartTime} type='Time'isNewShow={isNew} isTime={true} />
            <InputComponent text='end time' value={endTime} func={setEndTime} type='Time'isNewShow={isNew} isTime={true} />
            <InputComponent text='streamLink' value={stream} func={setStream} type='text' isNewShow={isNew}/>
            <InputComponent text='email' value={email} func={setEmail} type='text' isNewShow={isNew}/>
            <InputComponent text='currents ID' value={currentsID} func={setCurrentsID} type='text' isNewShow={isNew}/>
            <InputComponent text='description' value={description} func={setDescription} type='text' rows="4" cols="50" isNewShow={isNew}/>
            <InputComponent text='location' value={country} func={setCountry} type='text' isNewShow={isNew}/>
            <InputComponent text='image' value={image} func={setImage} type="image" isNewShow={isNew} />
            {isNew ? <input type="submit" value="submit" onClick={handleSubmit}/> : <input type="submit" value="submit edit" onClick={handleSubmit}/>}
            {!isNew ? <input type="submit" value="delete" onClick={handleSubmit}/> : <div/>}
          </form>
        </Modal>
      </div>
  )
}

export default ShowForm;

