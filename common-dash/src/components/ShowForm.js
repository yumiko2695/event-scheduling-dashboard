import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createShow, deleteShow, editShow} from '../helpers/shows'
import {getCoordinates} from '../helpers/coordinates'
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

const edition = 'common3';


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
    const {getEdition, handleGetShows, roomData, shows, show, formType} = props

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const openModal = () => {setIsOpen(true)}
    const afterOpenModal = () => {subtitle.style.color = '#f00'}

    const closeModal = () => {
        console.log('close')
        setIsOpen(false);
    }

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
        if(show) {
            setTitle(show.title)
            setArtist(show.artist)
            setCountry(show.country)
            setCurrentsID(show.currentsID)
            setDescription(show.description)
            setEmail(show.email)
            setStream(show.stream)
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
            //handleGetShows(edition)
            //getEdition(edition)
        } else {
            console.log('error in the get coordinates')
        }
    }
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
        }
    }
    const handleEditShow = async (edition, show, id) => {
        const data = await editShow(edition, show, id);
        if(data !== 'ERROR') {
        //getEdition(edition)
        handleGetShows(edition)
        console.log('show was edited')
        //function to refresh edition data!!!!!!
        } else {
        console.log('error in the edit show')
        }
    }
    const handleDeleteShow = async (edition, showID) => {
        const data = await deleteShow(edition, showID);
        if(data !== 'ERROR') {
            //getEdition(edition)
            handleGetShows(edition)
        //function to refresh edition data!!!!!!
        } else {
            console.log('error in the remove s how')
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
        {formType === 'newShow' ? <button onClick={openModal}>Add Show</button> : <button onClick={openModal}> Edit</button>}

            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            {formType === 'newShow' ? <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Show</h2> : <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Show</h2>}
                
                <InputComponent text='title' placeholder='Title of Performance' formType={formType} value={title} func={setTitle} type='text' />
                <InputComponent text='artist' placeholder='Artist Name' value={artist} func={setArtist} type='text' formType={formType}/>
                <InputComponent text='start time' value={startTime} func={setStartTime} isTime='showTime' formType={formType} />
                <InputComponent text='end time' value={endTime}  func={setEndTime} isTime='showTime'formType={formType} />
                <InputComponent text='streamLink' placeholder='https://network.currents-andata.xyz/live/[KEYHERE].m3u8' value={stream} func={setStream} formType={formType}/>
                <InputComponent placeholder='contact email' text='email' value={email} func={setEmail} type='text' formType={formType}/>
                <InputComponent placeholder="Currents ID from template" text='currents ID' value={currentsID}  func={setCurrentsID} type='text' formType={formType}/>
                <InputComponent placeholder="bio + description of show" text='description' value={description} func={setDescription} type='text' formType={formType}/>
                <div className="Location"
                style={locationStyle}>
                <InputComponent text='location' value={country} func={setCountry} type='text'  isLocation={true} formType={formType} placeholder="city, country"/>
                    <button name='coordinates' onClick={()=>handleGetCoordinates(country)}>Search for GPS</button>
                </div>
    {showData.lat && showData.lon ? <div>latitude: {showData.lat}, longitude: {showData.lon}</div> : <div>latitude: <br></br> longitude: </div>}
                <label>Image:</label>
            {isUploading && <p>Progress: {progress}</p>}
            {imageURL && <div>
    {imageURL}</div>}
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

                {formType === 'newShow' ? <input type="submit" value="submit" onClick={handleSubmit}/> : <input type="submit" value="submit edit" onClick={handleSubmit}/>}
                {formType !== 'newShow' ? <input type="submit" value="delete" onClick={handleSubmit}/> : <div/>}
            
            </Modal>
        </div>
    )
}

export default ShowForm;

