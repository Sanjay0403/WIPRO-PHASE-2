import React, { Component } from 'react'

export default class Comp7 extends Component {
  render() {
    return (
      <div>Comp7
        <Person name="kapil" eyeColor="Blue" age="23"/>
        
        <Person name="gaurav" eyeColor="green"/>
        
        <Person/>
      </div>
    )
  }
}


class Person extends Component
{
    render()
    {
        return(
<b> Name : {this.props.name} <br/>
    Eye Color : {this.props.eyeColor}<br/>
    Age : {this.props.age} </b>
        )
    }
}

Person.defaultProps=
{
     name:"def",
     age:"40",
     eyeColor:"black"
}