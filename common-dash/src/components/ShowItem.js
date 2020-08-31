import React, {useState} from 'react';
import ShowForm from './ShowForm'
import {getShows} from '../helpers/shows'

const showStyle = {
  outlineWidth: '.5px',
  outlineColor: 'green',
  outlineStyle: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '3px'
}

function ShowItem(props) {
  var subtitle;
  const {show} = props
  console.log(show);

  //handleRemove hook here

  return (
    <div className="Show" style={showStyle}>
      <div>title: {show.title}</div>
        <div>artist: {show.artist}</div>
        <div>start: {show.startTime}</div>
        <div>end: {show.endTime}</div>
        <div>location: {show.country}</div>
        <div>currentsID: {show.currentsID}</div>
        <div>bio: {show.description}</div>
        <div>email: {show.email}</div>
        <div>streamLink: {show.stream}</div>
      <ShowForm show={show} isNew={false} getShows={getShows}/>
    </div>
  );
}

export default ShowItem;
