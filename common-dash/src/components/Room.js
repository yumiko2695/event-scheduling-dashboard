import React, {useState, useEffect} from 'react'
import ShowItem from './ShowItem'
import ShowForm from './ShowForm'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'

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
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Show(props) {
  const { show, index, getEdition, handleGetShows }  = props
  return (
    <div>
    {show && show.id ?
    <Draggable draggableId={show.id} show={show} index={index} getEdition={getEdition}>
    {provided => (
      <ShowItem show={show} getEdition={getEdition} handleGetShows={handleGetShows}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
      </ShowItem>
    )}
  </Draggable>
  : <div></div>
    }
    </div>
  );
}


function Room(props) {
  const {roomData, roomKey, getEdition, handleGetShows, shows} = props;
  // function onDragEnd(result) {
  //     if (!result.destination) {
  //       return;
  //     }
  //     if (result.destination.index === result.source.index) {
  //       return;
  //     }
  //     const shows = reorder(
  //       shows,
  //       result.source.index,
  //       result.destination.index
  //     );
  //     setOrderedShows(shows)
  //   }
  //   useEffect(() => {
  //     if(shows) {
  //       //order shows
  //       getShows(shows)
  //     }
  // }, [shows])

  return (
      <div className="Room" style={roomStyle}>
        <div className="RoomInfo" style={roomInfoStyle}>
        <p>Room Num: {roomData.roomId} </p>
          <h1>Collective Name: {roomData.subName}</h1>
          <h2>Room Name: {roomData.name}</h2>
          <p>Location: {roomData.location}</p>
          <p>Stream ID: {roomData.streamId}</p>
          <p>Stream Link: {roomData.streamLink}</p>
  <p>Start Time: {roomData.startTime}</p>
          <RoomForm isNew={false} roomData={roomData} roomKey={roomKey} isRoom={true} getEdition={getEdition} />
        </div>
        <div className="RoomLineup" >
        <DragDropContext onDragEnd={null}>
          <Droppable droppableId="list" >
          {(provided) => {
           return <div ref={provided.innerRef} {...provided.droppableProps}>
              {shows && shows.map((show, index) => (<Show show={show} key={index} getEdition={getEdition} handleGetShows={handleGetShows} roomData={roomData}>
              {provided.placeholder}
              </Show>))}
              <div></div>
            </div>
          }}
          </Droppable>
      </DragDropContext>
      </div>
      <ShowForm handleGetShows={handleGetShows} getEdition={getEdition} isNew={true} shows={shows} roomData={roomData} />
      </div>

  );
}

export default Room
