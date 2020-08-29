import React from 'react';

function TextInput(props) {
  const {func, type, value, text, initialVal} = props

  return (
    <div className="Input">
        <label>
          {type}
          <input type="text" name={type} text={initialVal} value={value} placeholder onChange={async (event) => { await func(event.target.value)}}/>
        </label>
    </div>
  )
}

function EmptyTextInput(props) {
  const {text, func, type, value} = props
  return (
    <div className="Input">
        <label>
          {text}
          <input type={type} name={text} value={value} onChange={async (event) => {await func(event.target.value)}}/>
        </label>
    </div>
  )
}


function InputComponent(props) {
  const {func, type, isNewFormEntry, value, roomData, text, isNewShow} = props
  if(isNewFormEntry || isNewShow) {
    return  <EmptyTextInput func={func} text={text} type={type} value={value}/>
  }
  if(roomData) {
    let val = roomData[`${value}`]
    return <TextInput initialVal={val}func={func} type={type} value={value} />
  }

  //  if (typeof text === 'string') {
  //    return <TextInput func={func} type={type} value={value} text={text}/>
  //  }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
