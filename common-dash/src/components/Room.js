import React, {useState, useEffect} from 'react'
import ShowItem from './ShowItem'
import ShowForm from './ShowForm'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'
import {editShow} from '../helpers/shows'
import moment from 'moment';


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




function Room(props) {
  const {roomData, roomKey, getEdition, handleGetShows, edition, shows, i} = props;

  const [orderedShows, setOrderedShows] = useState(false)

  function onDragEnd(result) {
        if (!result.destination) {
        return;
      }
      if (result.destination.index === result.source.index) {
        return;
      }
      let newOrderedShows = reorder(
        orderedShows,
        result.source.index,
        result.destination.index
      );
      let i = result.destination.index;
      let updatedShows = []
      while(i < newOrderedShows.length) {
        let current = newOrderedShows[i];
        if(i === 0) {
          let setLength = current.endTime-current.startTime;
          let startTime = roomData.roomStartTime.toDate()
          let endTime = moment(new Date(startTime)).add(setLength, 'seconds').format()
          console.log(endTime)
          console.log(new Date(startTime))
          let updatedShow = {...current, startTime: new Date(startTime), endTime: new Date(endTime)}
          updatedShows.push(updatedShow)
          editShow(edition, updatedShow, updatedShow.id)
          //edit show data
        } else {
          let startTime = updatedShows[i-1].endTime
          console.log(startTime)
          let setLength = current.endTime - current.startTime;
          let endTime = moment(new Date(startTime)).add(setLength, 'seconds')
          let updatedShow = {...current, startTime: new Date(startTime), endTime: new Date(endTime)}
          updatedShows.push(updatedShow)
          editShow(edition, updatedShow, updatedShow.id)
         // editShow(edition, updatedShow, updatedShow.id)
        }
        i++;
      }
      setOrderedShows(updatedShows)
    }
    useEffect(() => {
      if(shows) {
        let filteredShows = shows.filter(show => show.roomKey === roomData.key)
        filteredShows = filteredShows.sort((a,b) => {
          return a.startTime - b.startTime
        })
        setOrderedShows(filteredShows)
      }
  }, [shows])
  return (
      <div className="Room" style={roomStyle}>
        <div className="RoomInfo" style={roomInfoStyle}>
        <div style={{opacity: .54}}>Room {i} </div>
          {roomData && roomData.name ?
          <div>
          <div style={{marginBottom: 8, fontWeight: 500}}>Room Name: {roomData.name}</div>
          <div style={{fontSize: 11, marginBottom: 16, paddingBottom: 8}}>
            <div style={{marginBottom: 8}}>Start Time: {roomData.startTime}</div>
            <div>Collective ID: {roomData.subName}</div>
            <div>Location: {roomData.location}</div>
            <div>Stream ID: {roomData.streamId}</div>
            <div>Stream Link: {roomData.streamLink}</div>
            </div>
            </div> : <div></div> }
          <RoomForm index={i} formType="editRoom" roomData={roomData} edition={edition} roomKey={roomKey} getEdition={getEdition} />
        </div>
        <div className="RoomLineup" >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" >
          {(provided, snapshot) => {
           return <div ref={provided.innerRef} {...provided.droppableProps}>
              {orderedShows && orderedShows.map((show, index) => (
                <Draggable draggableId={show.id} show={show} key={index} index={index} getEdition={getEdition}>
                {(provided, snapshot) => (
                  <div  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}>
                  <ShowItem show={show} getEdition={getEdition} handleGetShows={handleGetShows} />
                  </div>
                )}
              </Draggable>
              ))}
              <div>
              </div>
            </div>
          }}
          </Droppable>
      </DragDropContext>
      </div>
      <ShowForm edition={edition} handleGetShows={handleGetShows} getEdition={getEdition} formType='newShow' shows={shows} i={i} roomKey={roomKey} />
      </div>

  );
}

export default Room
