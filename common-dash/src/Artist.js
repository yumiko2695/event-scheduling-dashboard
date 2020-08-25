import React, {useState} from 'react';
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

function sample(text) {
  console.log(text)
}

Modal.setAppElement('#root')

function Artist(props) {
  var subtitle;
  const {jsonData} = props

  //remove action here
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true)
  }
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  //handleRemove hook here

  return (
    <div className="Artist">
      <div className="ArtistLeft">
      <h3>{jsonData.artist}</h3>
      </div>
      <div className="ArtistRight">
        <button onClick={openModal}>Edit</button>
        <button>Remove</button>
      </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Artist Info</h2>
          <div>
          {Object.keys(jsonData).map(char => (
            <InputComponent text={jsonData[char]} func={sample} type={char}/>
          ))}
          </div>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
    </div>
  );
}

export default Artist;
