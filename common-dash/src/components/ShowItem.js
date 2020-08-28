import React, {useState} from 'react';
import ShowForm from './ShowForm'

function ShowItem(props) {
  var subtitle;
  const {jsonData} = props

  //handleRemove hook here

  return (
    <div className="Show">
      <div className="ShowLeft">
      <p>{jsonData.artist}</p>
      <p>start time</p>
      </div>
      <ShowForm jsonData={jsonData}/>
    </div>
  );
}

export default ShowItem;
