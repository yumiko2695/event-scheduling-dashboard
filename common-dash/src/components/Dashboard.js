import React, {useState, useEffect} from 'react'
import Room from './Room'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'
import {getShows} from '../helpers/shows'

const edition = 'common3'; //FIXME this should be able to be changed with the right permissions


const roomContainerStyle = {
  display: 'flex',
  flexDirection: 'horizontal',
  flexWrap: 'nowrap',
  paddingLeft: '1vw',
  paddingRight: '1vw',
  paddingTop: '5vh',
  outlineWidth: '3px',
  
  outlineStyle: 'auto',
  margin: 16,
  padding: 24,
}

const dashboardButtonStyle = {
  padding: '3vh',
}

const dashboardTitleStyle = {
  padding: '8px',
  fontSize: 48,
  fontWeight: 300,
}

function Dashboard() {
  const [editionData, setEditionData] = useState(false)
  const [shows, setShows] = useState(false);

  const handleGetShows = async (edition) => {
    const data = await getShows(edition);
    if(data !== 'ERROR') {
      setShows(data);
    } else {
      console.log('error in the get edition')
    }
  }
  const getEdition = async (edition) => {
    const data = await getEditionData(edition);
    if(data !== 'ERROR') {
      console.log(data)
      setEditionData(data);
    } else {
      console.log('error in the get edition')
    }
  }

  useEffect(() => {
    if(edition) {
      getEdition(edition)
      handleGetShows(edition)
    }
  }, [edition])


  return (
    <div className="Dashboard">
      <div className="DashBoardButton" style={dashboardButtonStyle}>
    <div className="dashboardTitle" style={dashboardTitleStyle}>COMMON EDITION: {edition}</div>
  <div>START TIME: {edition && editionData && editionData.start && new Date(editionData.start).toString()}</div>
  <div>END TIME: {edition && editionData && editionData.end && new Date(editionData.end).toString()}</div>
        {(editionData && editionData.rooms) ?
        <RoomForm edition={edition} getEdition={getEdition} isNew={true} roomsArr={editionData.rooms}/>
        : <RoomForm edition={edition} getEdition={getEdition} isNew={true}/>
      }
      </div>
      <div>ROOMS</div>
      <div className="RoomContainer" style={roomContainerStyle}>
        {editionData && editionData.organizers && shows  ? Object.keys(editionData.organizers).map((room, index) => (
              <Room edition={edition} roomData={editionData.organizers[room]} roomKey={room} getEdition={getEdition} handleGetShows={handleGetShows} shows={shows[index]} key={index}/>
          )
        ) : null}

        </div>
    </div>
  );
}

export default Dashboard;
