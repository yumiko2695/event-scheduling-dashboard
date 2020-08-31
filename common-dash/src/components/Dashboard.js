import React, {useState, useEffect} from 'react'
import Room from './Room'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'
import {getShows} from '../helpers/shows'

const edition = 'test';


const roomContainerStyle = {
  display: 'flex',
  flexDirection: 'horizontal',
  flexWrap: 'nowrap',
  paddingLeft: '1vw',
  paddingRight: '1vw',
  paddingTop: '5vh',
  outlineWidth: '3px',
  outlineColor: 'red',
  outlineStyle: 'auto',
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
      <div>
        {editionData && editionData.rooms ?
        <RoomForm getEdition={getEdition} isNew={true} roomsArr={editionData.rooms}/>
        : <RoomForm getEdition={getEdition} isNew={true}/>
      }
      </div>
      <div className="RoomContainer" style={roomContainerStyle}>
        {editionData && editionData.organizers && shows  ? Object.keys(editionData.organizers).map((room, index) => (
              <Room roomData={editionData.organizers[room]} roomKey={room} getEdition={getEdition} handleGetShows={handleGetShows} shows={shows[index]} key={index}/>
          )
        ) : null}

        </div>
    </div>
  );
}

export default Dashboard;
