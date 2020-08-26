import React from 'react';

function TextInput(props) {
  const {text, func, type, value} = props
  return (
    <div className="Input">
      <form>
        <label>
          {type}
          <input type="text" name="name" value={text} placeholder onChange={(event) => {func(event.target.value)}}/>
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
          <input type="text" name="name" value={value} placeholder onChange={(event) => {func(event.target.value)}}/>
        </label>
      </form>
    </div>
  )
}


function InputComponent(props) {
  const {text, func, type, isNewFormEntry, value} = props
  if(isNewFormEntry) {
    return  <EmptyTextInput text={text} func={func} type={type} value={value}/>
  }
  if (typeof text === 'string') {
    return  <TextInput text={text} func={func} type={type} value={value}/>
  }
  else {
    return <div>hello</div>
  }


}

export default InputComponent;
