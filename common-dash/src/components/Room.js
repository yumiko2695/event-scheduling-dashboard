import React, {useState, useEffect} from 'react'
import ShowItem from './ShowItem'
import ShowForm from './ShowForm'
import {jsonData, jsonData1, jsonData2} from '../jsonData'
import RoomForm from './RoomForm'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Show({ show, index }) {
  return (
    <Draggable draggableId={show.id} index={index}>
      {provided => (
        <ShowItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {show}
        </ShowItem>
      )}
    </Draggable>
  );
}


function Room(props) {
  const {roomData, roomKey, getEdition, getShows, shows} = props;
  const [orderedShows, setOrderedShows] = useState([])
  function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
      if (result.destination.index === result.source.index) {
        return;
      }
      const shows = reorder(
        orderedShows,
        result.source.index,
        result.destination.index
      );
      setOrderedShows(shows)
    }
    useEffect(() => {
      if(shows) {
        //order shows
        setOrderedShows(shows)
      }
  }, [shows])

  return (
      <div className="Room" style={roomStyle}>
        <div className="RoomInfo" style={roomInfoStyle}>
        <p>Room Num: Hardcode </p>
          <h1>Collective Name: {roomData.subName}</h1>
          <h2>Room Name: {roomData.name}</h2>
          <p>Location: {roomData.location}</p>
          <p>Stream ID: {roomData.streamId}</p>
          <p>Stream Link: {roomData.streamLink}</p>
          <p>Start Time: DO WE ADD THIS TO THE DATABASE</p>
          <RoomForm isNew={false} roomData={roomData} roomKey={roomKey} getEdition={getEdition}/>
        </div>
        <ShowForm getShows={getShows} isNew={true}/>
        <div className="RoomLineup" style={roomLineupStyle} shows={shows}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" >
          {(provided) => {
           return <div ref={provided.innerRef} {...provided.droppableProps}>
              {orderedShows && orderedShows.map((show, index) => (<Show shows={show} key={index} roomData={roomData}>
              {provided.placeholder}
              </Show>))}
              <div></div>
            </div>
          }}
          </Droppable>
      </DragDropContext>
      </div>
      </div>

  );
}

export default Room
