import React, {useState, useEffect} from 'react'
import Room from './Room'
import RoomForm from './RoomForm'
import { getEditionData } from '../helpers/editionData'
import { getShows } from '../helpers/shows'

const axios = require('axios')
//const edition = 'common3'; //FIXME this should be able to be changed with the right permissions

const edition = 'test'

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

function Dashboard(props) {
  const {authed, admin} = props
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
    const data = await axios.get('/edition/rooms', {
        params: {edition: edition}
    })
    console.log(data.data)
    if(data !== 'ERROR') {
      setEditionData(data.data);
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
  console.log(admin)
  return (
    <div className="Dashboard">
      <div className="DashBoardButton" style={dashboardButtonStyle}>
    <div className="dashboardTitle" style={dashboardTitleStyle}>COMMON EDITION: {edition}</div>
  <div>START TIME: {edition && editionData && editionData.start && new Date(editionData.start).toString()} <i>in your local time zone</i></div>
  <div>END TIME: {edition && editionData && editionData.end && new Date(editionData.end).toString()} <i>in your local time zone</i></div>
        {(editionData && editionData.rooms) ?
        <RoomForm edition={edition} getEdition={getEdition} roomsArr={editionData.rooms} formType='newRoom'/>
        : <RoomForm edition={edition} getEdition={getEdition} formType='newRoom' />
      }
      </div>
      <div>ROOMS</div>
      <div className="RoomContainer" style={roomContainerStyle}>
        {editionData && editionData.rooms && editionData.organizers && shows ? editionData.rooms.map((room, index) =>           (
              <Room edition={edition} roomData={editionData.organizers[room]} roomKey={room} getEdition={getEdition} handleGetShows={handleGetShows} shows={shows} i={index} key={index}/>
          )
        ) : null}

        </div>
    </div>
  );
}

export default Dashboard;
