import React from 'react';
// import { values } from 'lodash';

function TextInputShow(props) {
  const {func, type, value, text, initialVal, isRoom, placeholder, name } = props
  if(value) {
    return (
      <div className="Input">
          <label>
            {text}
            <input placeholder={placeholder} name={name}type="text" text={initialVal} value={value} onChange={async (event) => { await func(event)}} required/>
          </label>
      </div>
    )
  }
    else {
      return (
        <div className="Input">
            <label>
              {text}
              <input placeholder={placeholder} name={name}type="text" text={initialVal} value={initialVal} onChange={async (event) => { await func(event)}} required/>
            </label>
        </div>
      )
    }

}
function TextInputRoom(props) {
  const {func, initialVal, type, name, value, text, placeholder} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type="text" placeholder={placeholder} name={name} text={initialVal} value={value} onChange={async (event) => { await func(event)}} required/>
        </label>
    </div>
  )
}

function EmptyTextInput(props) {
  const {text, func, type, name, value, cols, rows, placeholder} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input placeholder={placeholder} type="text" name={name} value={value} onChange={async (event) => {await func(event)}} rows={rows} cols={cols} required/>
        </label>
    </div>
  )
}

function TimeInput(props) {
  const {text, func, type, value, name, editShow, isNewShow} = props
  if(!editShow) {
    return (
      <div className="Input">
          <label>
            {text}
            <input type="datetime-local" name={name} onChange={async (event) => {await func(new Date(event.target.value))}} />
            <i>in your local time zone</i>
          </label>
      </div>
    )
  }
  if(editShow) {
    return (
      <div className="Input">
          <label>
            {text}
            <input type="datetime-local" name={name} onChange={async (event) => {await func(event.target.value)}} />
            <i>in your local time zone</i>
          </label>
      </div>
    )
  } else {
  return (
    <div className="Input">
        <label>
          {text}
          <input type="datetime-local" name={name} onChange={async (event) => {await func(event)}} />
          <i>in your local time zone</i>
        </label>
    </div>
  )}
}

function ImageInput(props) {
  const {text, func, type, value, name} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type="file" name={name} onChange={async (event) => {await func(event.target.files[0])}} required/>
        </label>
    </div>
  )
}


function InputComponent(props) {
  const {func, type, editShow, placeholder, isNewFormEntry, value, roomData, text, isNewShow, isTime, isRoom, isImage, name} = props

  if(isImage === 'true') {
    return <ImageInput editShow={editShow} func={func} name={name}/>
  }
  if(isTime === 'true') {
    return  <TimeInput func={func} text={text} name={name}/>
  }else if(!editShow) {
    return <TextInputShow isNewShow={isNewShow} placeholder={placeholder} text={text} func={(event) => {func(event.target.value)}} value={value} name={name}/>
  }
  else if(isNewFormEntry === 'true' || isNewShow === 'true' ) {
    return  <EmptyTextInput placeholder={placeholder} func={func} text={text} value={value} name={name}/>
  }
  else if(editShow) {
    let val = value;
    return <TextInputShow placeholder={placeholder} initialVal={val} text={text} func={(event) => {func(event.target.value)}} value={value} name={name}/>
  }
  else if(isNewShow ==='false' || isNewFormEntry ==='false') {
    let val = value;
    if(!val) {
      val = roomData[name]
    }
    return <TextInputShow placeholder={placeholder} initialVal={val} text={text} func={func} value={value} name={name}/>
  }
  else if(isRoom || isNewFormEntry) {
    return <TextInputRoom  placeholder={placeholder} text={text} func={func} value={value} name={name}/>
  }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
