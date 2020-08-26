import React from 'react'
import Artist from './Artist'
import {jsonData, jsonData1, jsonData2, roomData} from '../jsonData'
let roomDataEx = {...roomData}


function Room(props) {
  const {roomData} = props;
  console.log(roomData);
  return (
      <div className="Room">
        <div className="RoomInfo">
          <h1>Room Num: {roomDataEx.number}</h1>
          <h2>Room Name: {roomData.name}</h2>
          <h2>Location: {roomData.location}</h2>
          <h2>Vimeo Channel {roomDataEx.streamId}</h2>
          <h2>Vimeo Link: {roomDataEx.streamLink}</h2>
          <h2>Start Time: {roomDataEx.startTime}</h2>
        </div>
        <div className="RoomLineup">
          <Artist jsonData={jsonData}/>
          <Artist jsonData={jsonData1}/>
          <Artist jsonData={jsonData2}/>
        </div>
      </div>
  );
}

export default Room;
