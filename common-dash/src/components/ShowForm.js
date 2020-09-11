import React, {useState, useEffect} from 'react';
import Modal from 'react-modal'
import InputComponent from './Input'
import {createShow, deleteShow, editShow} from '../helpers/shows'
import {getCoordinates} from '../helpers/coordinates'
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import inputConfigShow from './inputConfigShow.json'
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


Modal.setAppElement('#root')

function ShowForm(props) {
    var subtitle;
    const {getEdition, handleGetShows, roomKey, show, formType, i} = props

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const openModal = () => {setIsOpen(true)}
    const afterOpenModal = () => {subtitle.style.color = '#f00'}

    const closeModal = () => {
        console.log('close')
        setIsOpen(false);
    }

    const [imageURL, setImageURL] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const [showData, setShowData] = useState({type: 'single', ...show});

    useEffect(() => {
        if(show) {
            setShowData(show)
        }
    }, [show])

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
            setShowData({...showData, imageURL: url })});
    };
    const handleGetCoordinates = async (country) => {
        let newCountry = country + ' ';
        const data = await getCoordinates(newCountry);
        setShowData({...showData, lat: data.latitude, lon: data.longitude})
        if(data !== 'ERROR') {
        } else {
            console.log('error in the get coordinates')
        }
    }
    const handleChange = (event) => {
        if(event.target.name === 'startTime' ||     event.target.name === 'endTime') {
            setShowData({...showData, [event.target.name]: new Date(event.target.value)})
        } else {
          setShowData({...showData, [event.target.name]: event.target.value})
        }
      }
    const handleCreateShow = async (edition, show) => {
        let newShow = {...show, roomKey: roomKey, room: i}
        console.log(newShow)
        const data = await createShow(edition, newShow);
        if(data !== 'ERROR') {
            handleGetShows(edition)
            getEdition(edition)
            setShowData({type: 'string'})
            setImageURL("")
            closeModal()
        } else {
            console.log('error in the add show')
        }
    }
    const handleEditShow = async (edition, show, id) => {
        const data = await editShow(edition, show, id);
        if(data !== 'ERROR') {
        handleGetShows(edition)
        console.log('show was edited')
        setShowData({type: 'string'})
        setImageURL("")
        closeModal()
        } else {
        console.log('error in the edit show')
        }
    }
    const handleDeleteShow = async (edition, showID) => {
        const data = await deleteShow(edition, showID);
        if(data !== 'ERROR') {
            handleGetShows(edition)
            setShowData({type: 'string'})
            setImageURL("")
            closeModal()
        } else {
            console.log('error in the remove s how')
        }
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

            {inputConfigShow.map((inputProps, index) => (<InputComponent {...inputProps} fieldData={showData[inputProps.field]} func={handleChange} key={index}/>))}
            <div>
            <button name='coordinates' onClick={()=>handleGetCoordinates(showData.country)}>Search for GPS</button>
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
                {formType === 'newShow' ? <input type="submit" value="submit" onClick={() => {
                    handleCreateShow(edition, showData)}}/> : <input type="submit" value="submit edit" onClick={() => {handleEditShow(edition, showData, showData.id)}}/>}
                {formType !== 'newShow' ? <input type="submit" value="delete" onClick={() => handleDeleteShow(edition, showData.id)}/> : <div/>}
            </Modal>
        </div>
    )
}

export default ShowForm;

