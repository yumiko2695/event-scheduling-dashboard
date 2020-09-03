import React from 'react';
// import { values } from 'lodash';

function TextInput(props) {
  const {func, type, value, text, initialVal, isRoom, placeholder, name } = props
  if(value) {
    return (
      <div className="ShowInput">
          <label>
            {text}
            <input placeholder={placeholder} name={name}type="text" text={initialVal} value={value} onChange={(event) => { func(event.target.value)}} required/>
          </label>
      </div>
    )
  }
    else {
      return (
        <div className="RoomInput">
            <label>
              {text}
              <input placeholder={placeholder} name={name}type="text" text={initialVal} value={value} onChange={func} required/>
            </label>
        </div>
      )
    }

}

function EmptyTextInputShow(props) {
  const {text, func, type, name, value, cols, rows, placeholder} = props
  return (
    <div className="EmptyTextInputShow">
        <label>
          {text}
          <input placeholder={placeholder} type="text" name={name} value={value} onChange={(event) => {func(event.target.value)}} rows={rows} cols={cols} required/>
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
          <input placeholder={placeholder} type="text" name={name} value={value} onChange={(event) => {func(event)}} rows={rows} cols={cols} required/>
        </label>
    </div>
  )
}

function TimeInputRoom(props) {
  const {text, func, type, value, name, formType, isTime} = props
    return (
      <div className="TimeInputRoom">
          <label>
            {text}
            <input type="datetime-local" name={name} onChange={(event) => {func(new Date(event.target.value))}} />
            <i>in your local time zone</i>
          </label>
      </div>
    )

}

function TimeInputShow(props) {
  const {text, func, type, value, name, formType, isTime} = props
    return (
      <div className="TimeInputShow">
          <label>
            {text}
            <input type="datetime-local" name={name} onChange={(event) => {func(new Date(event.target.value))}} />
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
          <input type="file" name={name} onChange={(event) => {func(event.target.files[0])}} required/>
        </label>
    </div>
  )
}


function InputComponent(props) {
  const {func, formType, placeholder, value, roomData, text, isTime, isImage, name} = props

  if(isImage === 'true') {
    return <ImageInput func={func} name={name}/>
  }
  else if(isTime === 'showTime' ) {
    return  <TimeInputShow isTime={isTime} func={func} text={text} name={name} formType={formType}/>
  }
  else if(isTime === 'roomTime' ) {
    return  <TimeInputRoom isTime={isTime} func={func} text={text} name={name} formType={formType}/>
  }
  else if(formType === 'newShow'){
    return  <EmptyTextInputShow placeholder={placeholder} func={func} text={text} value={value} name={name}/>
  }
  else if(formType === 'editShow'){
    return (
      <TextInput placeholder={placeholder} formType={formType} initialVal={value} text={text} func={func} value={value} name={name}/>
    )
  }
  else if(formType === 'newRoom') {
    return  <EmptyTextInputRoom placeholder={placeholder} func={func} text={text} value={value} name={name}/>
  }
  else if(formType === 'editRoom') {
    let val = value;
    val = roomData[name]
    console.log(name)
    console.log(roomData)
    console.log(val)
    console.log(value)
    return (
      <TextInput placeholder={placeholder} initialVal={val} text={text} func={func} value={value} name={name} formType={formType}/>
    )
  }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
