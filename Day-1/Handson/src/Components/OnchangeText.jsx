import React, { useState } from 'react'

const OnchangeText = ({name,address}) => {
    const [data,setData]=useState({name,address})

    const handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div>
        <label htmlFor="#">Name:</label>
      <input type="text" name="name" value={data.name} onChange={handleChange} />
      <label htmlFor="#">Address:</label>
      <input type="text" name="address" value={data.address} onChange={handleChange} />
    </div>
    <h1>Updated Value:</h1>
    <h3>My name is {data.name}</h3>
    <h3>My address is {data.address}</h3>
    </>
  )
}

export default OnchangeText
