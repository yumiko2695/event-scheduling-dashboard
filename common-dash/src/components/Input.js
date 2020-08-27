import React from 'react';

function TextInput(props) {
  const {func, type, value, text, initialVal} = props
  console.log('type inside textinput: ', type)
  console.log('value inside textinput: ', value)
  console.log('text inside textinput: ', text)
  console.log('initialVal inside textinput: ', initialVal)

  return (
    <div className="Input">
      <form>
        <label>
          {type}
          <input type="text" name={type} text={initialVal} value={value} placeholder onChange={async (event) => { await func(event.target.value)}}/>
        </label>
      </form>
    </div>
  )
}

function EmptyTextInput(props) {
  const {text, func, type, value} = props
  return (
    <div className="Input">
      <form>
        <label>
          {type}
          <input type="text" name={type} value={text} onChange={(event) => {func(event.target.value)}}/>
        </label>
      </form>
    </div>
  )
}


function InputComponent(props) {
  const {func, type, isNewFormEntry, value, roomData, text} = props
  if(isNewFormEntry) {
    return  <EmptyTextInput func={func} type={type} value={value}/>
  }
  if(roomData) {
    let val = roomData[`${value}`]
    return <TextInput initialVal={val}func={func} type={type} value={value} />
  }

  // if (typeof text === 'string') {
  //   return <TextInput func={func} type={type} value={value} text={text}/>
  // }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
