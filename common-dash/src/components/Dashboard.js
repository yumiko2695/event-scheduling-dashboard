import React, {useState, useEffect} from 'react'
import Room from './Room'
import RoomForm from './RoomForm'
import {getEditionData} from '../helpers/editionData'
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
  const [editionData, setEditionData] = useState(false);  //state variable and hook

  const getEdition = async (edition) => {           //the function that calls our api call
    const data = await getEditionData(edition);
    if(data !== 'ERROR') {
      setEditionData(data);
    } else {
      console.log('error in the get edition')
    }
  }

  useEffect(() => {     // use effect that is enabled for a specific state variable, triggers when edition changes
    if(edition) {       //do stuff inside use effect
      getEdition(edition)   //have a function that changes the edition string, which will trigger this use effect
    }
  }, [edition])

  return (
    <div className="Dashboard">
      <div>
        <RoomForm getEdition={getEdition} isNew={true}/>
      </div>
      <div className="RoomContainer" style={roomContainerStyle}>
      {Object.keys(editionData).map((key) => {
          if(key === 'organizers') {
            return Object.keys(editionData[key]).map((roomName) => (
              <Room roomData={editionData[key][roomName]} roomKey={roomName} getEdition={getEdition}/>
            ))
          }
        })}
        </div>
    </div>
  );
}

export default Dashboard;
