import React from 'react';
import ShowForm from './ShowForm'
import moment from 'moment'

const showStyle = {
  marginBottom: 8,
  paddingBottom: 8,
  borderBottom: '1px solid rgba(255,255,255,.33)',
  display: 'flex',
  flexDirection: 'rows',
  padding: '3px',
  maxWidth: '240px'
}

const showLeftStyle = {
  padding: '3px',
  textAlign: 'left',
}

const showMiddleStyle = {
  padding: '3px',
  textAlign: 'left',
}
const showRightStyle = {
  padding: '3px',
  textAlign: 'right',
  alignItems: 'center',
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
  console.log(show.startTime)
  console.log(show.endTime)
  console.log(typeof show.startTime)
  //handleRemove hook here
  return (
    <div className="Show" style={showStyle}>
      <div className="ShowLeft" style={showLeftStyle}>
        <div>
        <h3><u>start</u>:</h3>
        </div>
        <div>
        {show && show.startTime.seconds ? <h3>{moment(show.startTime.toDate()).format("D/M/YYYY hh:mm:ss A [GMT]Z")}</h3>: <h3>{moment(show.startTime).format("D/M/YYYY hh:mm:ss A [GMT]Z")}</h3>}
        </div>
        <div>
        <h3><u>end</u>:</h3>
        </div>
        <div>
        {show && show.endTime.seconds ? <h3>{moment(show.endTime.toDate()).format("D/M/YYYY hh:mm:ss A [GMT]Z")}</h3> : <h3>{moment(show.endTime).format("D/M/YYYY hh:mm:ss A [GMT]Z")}</h3>}
        </div>
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
      <ShowForm show={show} formType="editShow" handleGetShows={handleGetShows} roomKey={show.roomKey} getEdition={getEdition} />
      </div>
    </div>
  );
}

export default ShowItem;
