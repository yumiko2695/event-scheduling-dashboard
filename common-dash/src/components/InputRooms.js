import React from 'react';
// import { values } from 'lodash';

function TextInput(props) {
  const {func, type, value, text, initialVal, isRoom, placeholder, name, formType } = props
    return (
        <div className="RoomInput">
            <label>
              {text}
              <input placeholder={placeholder} name={name}type="text" value={value} onChange={func} required/>
    {formType === 'editRoom' ? <i>prev: {initialVal}</i> : <div></div>}
            </label>
        </div>
      )
}

function EmptyTextInputRoom(props) {
  const {text, func, type, name, value, cols, rows, placeholder} = props
  return (
    <div className="EmptyTextInputRoom">
        <label>
          {text}
          <input placeholder={placeholder} type="text" name={name} value={value} onChange={func} required/>
        </label>
    </div>
  )
}

function TimeInput(props) {
  const {text, func, type, value, name, formType, isTime} = props
    return (
      <div className="TimeInputRoom">
          <label>
            {text}
            <input type="datetime-local" name={name} onChange={func} />
            <i>in your local time zone</i>
          </label>
      </div>
    )
}

function ImageInput(props) {
  const {text, func, type, value, name} = props
  return (
    <div className="FileInput">
        <label>
          {text}
          <input type="file" name={name} onChange={async (event) => {await func(event.target.files[0])}} required/>
        </label>
    </div>
  )
}
function EmptyKey(props) {
  const {text, func, type, name, value, cols, rows, placeholder} = props

  return (
    <div className="ShowInput">
        <label>
          {text}
          <input placeholder={placeholder} name={name}type="text" value={value} onChange={(event) => { func(event.target.value)}} required/>
        </label>
    </div>
  )
}
function RoomInputComponent(props) {
  const {func, formType, placeholder, value, roomData, text, isTime, isImage, name} = props
  if(name === 'key') {
    return  <EmptyKey placeholder={placeholder} func={func} text={text} value={value} name={name}/>
  }
  if(isImage === 'true') {
    return <ImageInput func={func} name={name} />
  }
  if(isTime === 'roomTime') {
    return  <TimeInput isTime={isTime} func={func} text={text} name={name} formType={formType}/>
  }
  if(formType === 'newRoom') {
    return  <EmptyTextInputRoom placeholder={placeholder} func={func} text={text} value={value} name={name}/>
  }
  if(formType === 'editRoom') {
    let val = value;
    val = roomData[name]
    return (
      <TextInput placeholder={placeholder} initialVal={val} text={text} func={func} value={value} name={name} formType={formType}/>
    )
  }
  else {
    return <div>hello</div>
  }


}

export default RoomInputComponent;
