import React, {useState, useEffect} from 'react'
import ShowItem from './ShowItem'
import ShowForm from './ShowForm'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const roomStyle = {

  display: 'flex',
  flexDirection: 'column',
  padding: '3px'
}
const roomInfoStyle = {
  outlineWidth: '1px',
  borderBottom: '1px solid rgba(255,255,255,.15)',
  outlineStyle: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 16,
  maxWidth: 240,
  textAlign: 'left',
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Show(props) {
  const { show, index, getEdition, handleGetShows, edition, editShow }  = props
  return (
    <div>
    {show && show.id ?
    <Draggable draggableId={index} show={show} index={index} getEdition={getEdition}>
    {provided => (
      <ShowItem show={show} editShow={editShow} getEdition={getEdition} handleGetShows={handleGetShows}
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
  const {roomData, roomKey, getEdition, handleGetShows, edition, shows, index, editShow} = props;
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
        <div style={{opacity: .54}}>Room {roomData.roomId} </div>
          <div style={{marginBottom: 8, fontWeight: 500}}>Room Name: {roomData.name}</div>
          <div style={{fontSize: 11, marginBottom: 16, paddingBottom: 8}}>
            <div style={{marginBottom: 8}}>Start Time: {roomData.startTime}</div>
            <div>Collective ID: {roomData.subName}</div>
            <div>Location: {roomData.location}</div>
            <div>Stream ID: {roomData.streamId}</div>
            <div>Stream Link: {roomData.streamLink}</div>
          </div>
          <RoomForm index={index} isNew={false} roomData={roomData} edition={edition} roomKey={roomKey} isRoom={true} getEdition={getEdition} />
        </div>
        <div className="RoomLineup" >
        <DragDropContext onDragEnd={null}>
          <Droppable droppableId="list" >
          {(provided) => {
           return <div ref={provided.innerRef} {...provided.droppableProps}>
              {shows && shows.map((show, index) => (<Show show={show} key={index} getEdition={getEdition} handleGetShows={handleGetShows} editShow={editShow} roomData={roomData}>
              {provided.placeholder}
              </Show>))}
              <div></div>
            </div>
          }}
          </Droppable>
      </DragDropContext>
      </div>
      <ShowForm edition={edition}handleGetShows={handleGetShows} getEdition={getEdition} isNew={true} shows={shows} editShow={false} roomData={roomData} />
      </div>

  );
}

export default Room
