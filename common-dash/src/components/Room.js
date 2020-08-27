import React from 'react'
import Artist from './Artist'
import {jsonData, jsonData1, jsonData2} from '../jsonData'
import RoomForm from './RoomForm'

const roomStyle = {
  outlineWidth: '.5px',
  outlineColor: 'black',
  outlineStyle: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '3px'
}

const roomInfoStyle = {
  outlineWidth: '1px',
  outlineColor: 'blue',
  outlineStyle: 'auto',
  //display: 'flex',
  // flexDirection: 'vertical'
}

const roomLineupStyle = {
  // display: 'flex',
  // flexDirection: 'vertical'
}

function Room(props) {
  const {roomData, roomKey, getEdition} = props;

  return (
      <div className="Room" style={roomStyle}>
        <div className="RoomInfo" style={roomInfoStyle}>
          <p>Room Num: Hardcode</p>
          <p>Collective Name: {roomData.subName}</p>
          {roomData.name ? <p>Room Name: {roomData.name}</p> : <p>please add room name</p>}
          <p>Location: {roomData.location}</p>
          <p>Stream ID: Hardcode</p>
          <p>Streak Link: Hardcode</p>
          <p>Start Time: DO WE ADD THIS TO THE DATABASE</p>
          <RoomForm isEdit={false} roomData={roomData} roomKey={roomKey} getEdition={getEdition}/>
        </div>
        <div className="RoomLineup" style={roomLineupStyle}>
          <Artist jsonData={jsonData}/>
          <Artist jsonData={jsonData1}/>
          <Artist jsonData={jsonData2}/>
        </div>
      </div>
  );
}

export default Room;
