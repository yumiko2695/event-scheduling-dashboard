import React from 'react';
import { values } from 'lodash';

function TextInputShow(props) {
  const {func, type, value, text, initialVal, isRoom } = props
    return (
      <div className="Input">
          <label>
            {text}
            <input type="text" name={text} text={initialVal} value={value} onChange={async (event) => { await func(event.target.value)}} required/>
          </label>
      </div>
    )

}
function TextInputRoom(props) {
  const {func, type, value, text} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type="text" name={text} text={value} value={value} onChange={async (event) => { await func(event.target.value)}} required/>
        </label>
    </div>
  )
}

function EmptyTextInput(props) {
  const {text, func, type, value, cols, rows} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type="text" name={text} value={value} onChange={async (event) => {await func(event.target.value)}} rows={rows} cols={cols} required/>
        </label>
    </div>
  )
}

function TimeInput(props) {
  const {text, func, type, value} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type="time" name={text} onChange={async (event) => {await func(event.target.value)}} required/>
        </label>
    </div>
  )
}


function InputComponent(props) {
  const {func, type, isNewFormEntry, value, roomData, text, isNewShow, isTime, isRoom} = props
  if(isTime) {
    return  <TimeInput func={func} text={text} />
  }
  else if(isNewFormEntry || isNewShow) {
    return  <EmptyTextInput func={func} text={text} value={value} />
  }
  else if(!isNewShow) {
    let val = value
    return <TextInputShow initialVal={val} text={text} func={func} value={value} />
  }
  else if(isRoom && !isNewFormEntry) {
    return <TextInputRoom text={text} func={func} value={value} />
  }
  else if(!isNewFormEntry) {
    return <TextInputRoom text={text} func={func} value={value} />
  }

  //  if (typeof text === 'string') {
  //    return <TextInput func={func} type={type} value={value} text={text}/>
  //  }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
