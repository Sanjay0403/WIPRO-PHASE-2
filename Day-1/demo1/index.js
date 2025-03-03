import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Comment from './Comment';

const root = ReactDOM.createRoot(document.getElementById('root'));
const r1 = React.createElement("h1", null, "hello wothout jxs");
const r2 = <h1> Hello with jxs </h1>
const author ={
  name:"Ajay Sood", date:"12/12/2024", image :"/images/pic1.jpg"};

const r11 = React.createElement("h1", {style :{color:'green'}}, "hello wothout jxs");
const r21 = <h1 style={{color:'red'}}> Hello with jxs </h1>
root.render(
  <React.StrictMode>
    {/* {r1}
    {r11}
    {r2}
    {r21} */}
    <App />
    <Comment text="text111" author={author}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
