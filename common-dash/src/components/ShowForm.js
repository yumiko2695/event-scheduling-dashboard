import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createShow, deleteShow, editShow} from '../helpers/shows'
import {getCoordinates} from '../helpers/coordinates'
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

const edition = 'test';


const customStyles = {
  direction: 'flex',
  flexDirection: 'row',
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: 'auto',
    backgroundColor: 'black',
    color: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.8)',
  },
};

const locationStyle = {
  direction: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'row'
}


Modal.setAppElement('#root')

function ShowForm(props) {
  var subtitle;
  const {getEdition, handleGetShows, roomData, isNew, shows, show} = props

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
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [stream, setStream] = useState("")
  const [room, setRoom] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // const [created, setCreated] = useState("");
  // const [donate, setDonate] = useState("");


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
    if(imageURL) {setShowData({...showData, imageURL: imageURL})}
  }, [imageURL])
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
      setImageURL(show.image)
      setStartTime(show.startTime)
      setEndTime(show.endTime)
    }
  }, [roomData])

const handleUploadStart = () => {
  setIsUploading(true);
  setProgress(0);
}
const handleProgress = (progress) => {
  setProgress(progress)
}
const handleUploadError = (error) => {
  setIsUploading(false)
  console.error(error)
}
const handleUploadSuccess = (filename) => {
  setImageURL(filename)
  setProgress(100)
  setIsUploading(false)
  firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
    .then(url => {setImageURL(url)
    setShowData({...roomData, imageURL: url })});
};
const handleGetCoordinates = async (country) => {
  let newCountry = country + ' ';
  const data = await getCoordinates(newCountry);
  console.log(data, 'data from getCoordinates')
  setShowData({...showData, lat: data.latitude, lon: data.longitude})
  if(data !== 'ERROR') {
    handleGetShows(edition)
    getEdition(edition)
  } else {
    console.log('error in the get coordinates')
}}
const handleCreateShow = async (edition, show) => {
    let newShow = {...show, roomId: room}
    console.log(newShow)
    const data = await createShow(edition, newShow);
  if(data !== 'ERROR') {
    handleGetShows(edition)
    getEdition(edition)
    console.log('room was added')
    console.log(shows);
    //function to refresh edition data!!!!!!
  } else {
    console.log('error in the add show')
  }}
const handleEditShow = async (edition, show, id) => {
  const data = await editShow(edition, show, id);
if(data !== 'ERROR') {
  getEdition(edition)
  handleGetShows(edition)
  console.log('show was edited')
  //function to refresh edition data!!!!!!
} else {
  console.log('error in the edit show')
}}
const handleDeleteShow = async (edition, showID) => {
  const data = await deleteShow(edition, showID);
if(data !== 'ERROR') {
  getEdition(edition)
  //function to refresh edition data!!!!!!
} else {
  console.log('error in the remove s how')
}}

const handleClick = (evt) => {
  evt.preventDefault()
  if(evt.target.name === 'coordinates') {
    handleGetCoordinates(country)
  }
}
const handleSubmit = (evt) => {
  evt.preventDefault()
  if(evt.target.value === 'delete') {
    handleDeleteShow(edition, show.id)
  }
  if(evt.target.value === 'submit edit') {
    handleEditShow(edition, showData, show.id)
  }
  if(evt.target.value === 'submit') {
    handleCreateShow(edition, showData);
  }
  setTitle("")
  setArtist("")
  setCurrentsID("")
  setCountry("")
  setDescription("")
  setEmail("")
  setImageURL("")
  setStartTime("")
  setEndTime("")
  setStream("")
  setRoom("")
  setShowData({type: 'string'})
  closeModal()
}

  //FIXME add placeholders to all the inputs
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
            <InputComponent text='title' value={title} func={setTitle} type='text' isNewShow={isNew.toString()}/>
            <InputComponent text='artist' value={artist} func={setArtist} type='text'isNewShow={isNew.toString()}/>
            <InputComponent text='start time' value={startTime} func={setStartTime} type='Time'isNewShow={isNew.toString()} isTime={true.toString()} />
            <InputComponent text='end time' value={endTime} func={setEndTime} type='DateTime'isNewShow={isNew.toString()} isTime={true.toString()} />
            <InputComponent text='streamLink' value={stream} func={setStream} type='text' isNewShow={isNew.toString()}/>
            <InputComponent text='email' value={email} func={setEmail} type='text' isNewShow={isNew.toString()}/>
            <InputComponent text='currents ID' value={currentsID} func={setCurrentsID} type='text' isNewShow={isNew.toString()}/>
            <InputComponent text='description' value={description} func={setDescription} type='text' isNewShow={isNew.toString()}/>
            <div className="Location" style={locationStyle}>
              <InputComponent text='location' value={country} func={setCountry} type='text' isNewShow={isNew} isLocation={true}/>
                <button name='coordinates'onClick={handleClick}>Search for GPS</button>
            </div>
            <div>show GPS here, idk if i searched</div>
            <label>Image:</label>
          {isUploading && <p>Progress: {progress}</p>}
          {imageURL && <div style="max-height:450px; max-width:450px; overflow: hidden">
   <img src={imageURL} />
</div>}
          <FileUploader
            accept="image/*"
            name="imageURL"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />

            {isNew ? <input type="submit" value="submit" onClick={handleSubmit}/> : <input type="submit" value="submit edit" onClick={handleSubmit}/>}
            {!isNew ? <input type="submit" value="delete" onClick={handleSubmit}/> : <div/>}
          </form>
        </Modal>
      </div>
  )
}

export default ShowForm;

