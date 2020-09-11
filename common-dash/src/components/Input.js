import React from 'react';

// function TextInput(props) {
//   const {func, type, value, text, initialVal, isRoom, placeholder, name } = props
//   if(value) {
//     return (
//       <div className="ShowInput">
//           <label>
//             {text}
//             <input placeholder={placeholder} name={name}type="text" text={initialVal} value={value} onChange={func} required/>
//           </label>
//       </div>
//     )
//   }
//     else {
//       return (
//         <div className="RoomInput">
//             <label>
//               {text}
//               <input placeholder={placeholder} name={name}type="text" text={initialVal} value={value} onChange={func} required/>
//             </label>
//         </div>
//       )
//     }

// }

// function EmptyTextInputShow(props) {
//   const {text, func, type, name, value, cols, rows, placeholder} = props
//   return (
//     <div className="EmptyTextInputShow">
//         <label>
//           {text}
//           <input placeholder={placeholder} type="text" name={name} value={value} onChange={(event) => {func(event)}} rows={rows} cols={cols} required/>
//         </label>
//     </div>
//   )
// }
// function EmptyTextInputRoom(props) {
//   const {text, func, type, name, value, cols, rows, placeholder} = props
//   return (
//     <div className="EmptyTextInputRoom">
//         <label>
//           {text}
//           <input placeholder={placeholder} type="text" name={name} value={value} onChange={(event) => {func(event)}} rows={rows} cols={cols} required/>
//         </label>
//     </div>
//   )
// }

// function TimeInputRoom(props) {
//   const {text, func, type, value, name, formType, isTime} = props
//     return (
//       <div className="TimeInputRoom">
//           <label>
//             {text}
//             <input type="datetime-local" name={name} onChange={(event) => {func(new Date(event.target.value))}} />
//             <i>in your local time zone</i>
//           </label>
//       </div>
//     )

// }

// function TimeInputShow(props) {
//   const {text, func, type, value, name, formType, isTime} = props
//     return (
//       <div className="TimeInputShow">
//           <label>
//             {text}
//             <input type="datetime-local" name={name} onChange={(event) => {func(event)}} />
//             <i>in your local time zone</i>
//           </label>
//       </div>
//     )
// }

// function ImageInput(props) {
//   const {text, func, type, value, name} = props
//   return (
//     <div className="FileInput">
//         <label>
//           {text}
//           <input type="file" name={name} onChange={(event) => {func(event.target.files[0])}} required/>
//         </label>
//     </div>
//   )
// }


function InputComponent(props) {
  const {func, fieldData, field, displayName, placeholder, type} = props
  return (
    <div className="EmptyTextInputRoom">
      <label>
        {displayName}
          {type === 'datetime-local' ?  <input placeholder={placeholder} type={type} name={field} onChange={func} required/> :  <input placeholder={placeholder} type={type} value={fieldData || ''} name={field} onChange={func} required/>}
        </label>
    </div>
  )



}

export default InputComponent;
