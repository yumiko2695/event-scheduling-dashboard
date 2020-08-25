import React from 'react';

function TextInput(props) {
  const {text, func, type} = props
  return (
    <div className="Input">
      <form>
        <label>
          {type}
          <input type="text" name="name" value={text} placeholder onChange={() => {func(text)}}/>
        </label>
      </form>
    </div>
  )
}


function InputComponent(props) {
  const {text, func, type} = props
  console.log(text)
  if (typeof text === 'string') {
    return  <TextInput text={text} func={func} type={type}/>
  }
  else {
    return <div>hello</div>
  }



}

export default InputComponent;
