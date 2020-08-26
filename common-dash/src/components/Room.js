import React from 'react'
import Artist from './Artist'
import {jsonData, jsonData1, jsonData2, roomData} from '../jsonData'


function Room() {
  return (
      <div className="Room">
        <div className="RoomInfo">
          <h1>Room Num: {roomData.number}</h1>
          <h2>Room Title: {roomData.title}</h2>
          <h2>Location: {roomData.lat},{roomData.lon}</h2>
          <h2>Vimeo Channel {roomData.streamId}</h2>
          <h2>Vimeo Link: {roomData.streamLink}</h2>
          <h2>Start Time: {roomData.startTime}</h2>
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
