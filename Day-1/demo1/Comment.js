import React from 'react'

export default function Comment(props) {
  return (
    <div>Comment Comp1<br/>
    Text is  {props.text}
    <br/>
    {/* Name is {props.author.name} */}
    <UserInfo author={props.author}/> 
    </div>
  )
}


export function UserInfo(props)
{
    return(
       <div> Inside UserInfo Comp 
        <b> Hello {props.author.name} 

        </b>
        <Details author={props.author}/>
       </div>
    )
}


export function Details(props)
{
return(
    <>
<b> Hello {props.author.name}  <br/>
  Your date of joining is {props.author.date}
</b>
<br/>
<img src={props.author.image}/>
</>
)
}