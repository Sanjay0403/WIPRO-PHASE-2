import React, { useState } from 'react'

const OnClickChangeText = ({text1,text2}) => {

    const [text,setText]=useState(null)

    const DisplayText1=()=>{
        setText('text1')
    }

    const DisplayText2=()=>{
        setText('text2')
    }
  return (
    <div>
        <button type="button" onClick={DisplayText1}>Show Text1</button>
        <br /> <br />
        <button type="button" onClick={DisplayText2}>Show Text2</button>
        <br />

        {text=='text1' && <h2>{text1} this is Amit</h2>}
        {text=='text2' && <h2>{text2} Dosto</h2>}
      
    </div>
  )
}

export default OnClickChangeText
