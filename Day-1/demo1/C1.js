import React, { Component } from 'react'

export default class C1 extends Component {
  render() {
    return (
      <div>C1
        <C2 name="deepak" address="new delhi"/>
        <C2 name="aa"/>
      </div>
    )
  }
}
export  class C2 extends Component {
  render() {
    return (
      <div>C2 Component 
   <h1> Name recd is {this.props.name} 
    <br/>
    Your address is {this.props.address}
   </h1>

      </div>
    )
  }
}

C2.defaultProps=
{
  address:"nmbmbmnb"
}
