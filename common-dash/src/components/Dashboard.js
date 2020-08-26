import React, {useState, useEffect} from 'react'
import Room from './Room'
import {getEditionData} from '../helpers/editionData'
const edition = 'test';

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
      <Room />
    </div>
  );
}

export default Dashboard;
