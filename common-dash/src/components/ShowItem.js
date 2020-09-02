import React, {useState} from 'react';
import ShowForm from './ShowForm'

const showStyle = {
  marginBottom: 8,
  paddingBottom: 8,
  borderBottom: '1px solid rgba(255,255,255,.33)',
  display: 'flex',
  flexDirection: 'rows',
  padding: '3px'
}

const showLeftStyle = {
  padding: '3px',
  textAlign: 'left',
  flexGrow: '1',
}

const showMiddleStyle = {
  padding: '3px',
  textAlign: 'left',
  flexGrow: '2'
}
const showRightStyle = {
  padding: '3px',
  textAlign: 'right',
  alignItems: 'center',
  flexGrow: '1'
}

const imageDivStyle = {
  maxHeight: '100px',
  maxWidth: '100px',
  overflow: 'hidden'
}
const imageStyle = {
  maxWidth:'100%',
  maxHeight:'100%'
}

function ShowItem(props) {
  var subtitle;
  const {show, handleGetShows, getEdition} = props

  //handleRemove hook here

  return (
    <div className="Show" style={showStyle}>
      <div className="ShowLeft" style={showLeftStyle}>
      <h3><u>start</u>:</h3>
      <h3>{show.startTime}</h3>
        <h3><u>end</u>:</h3>
        <h3>{show.endTime}</h3>
      </div>
      <div className="ShowMiddle" style={showMiddleStyle}>
      <div>title: <b>{show.title}</b></div>
        <div>artist: <b>{show.artist}</b></div>
        <div>location: <b>{show.country}</b></div>
        <div>currentsID: <b>{show.currentsID}</b></div>
        <div>bio: {show.description}</div>
        <div>email: <b>{show.email}</b></div>
        <div>streamLink: <b>{show.link}</b></div>
        <div>stream Key: <b>{show.stream}</b></div>
        <div className="Image" style={imageDivStyle}>
          <img src={show.imageURL} style={imageStyle}/>
        </div>
      </div>
      <div className="ShowRight" style={showRightStyle}>
      <ShowForm show={show} isNew={false} handleGetShows={handleGetShows} getEdition={getEdition} />
      </div>
    </div>
  );
}

export default ShowItem;
