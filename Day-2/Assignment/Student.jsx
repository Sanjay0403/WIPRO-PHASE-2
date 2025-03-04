import React from 'react'

const Student = (props) => {
  return (
    <div>
        <h1>Below Deatils are deplayed using Function Component</h1>
      <h1>My name is {props.name}</h1>
      <h1>My address is {props.address}</h1>
      <h1>My score is {props.score}</h1>
    </div>
  )
}

export default Student
