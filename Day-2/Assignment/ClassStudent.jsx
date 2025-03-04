import React, { Component } from 'react'

class ClassStudent extends Component {
    render(){
  return (
    <div>
      <h1>Below Deatils are deplayed using class Component</h1>
      <h1>My name is {this.props.name}</h1>
      <h1>My address is {this.props.address}</h1>
      <h1>My score is {this.props.score}</h1>
    </div>
  )
}
}

export default ClassStudent
