
import './App.css'
import ClassCompo1 from './ClassCompo1'
import ClassCompo2 from './ClassCompo2'
import ClassCompo3 from './ClassCompo3'
import ClassCompo4 from './ClassCompo4'
import ClassStudent from './ClassStudent'
import Compo1 from './Compo1'
import Compo2 from './Compo2'
import Compo3 from './Compo3'
import Compo4 from './Compo4'
import OnchangeText from './OnchangeText'
import OnClickChangeText from './OnClickChangeText'
import Student from './Student'

function App() {
  

  return (
    <>
     <h1>Hellow World</h1>
     <Compo1/>
     <Compo2/>
     <Compo3/>
     <Compo4/>
     <ClassCompo1/>
     <ClassCompo2/>
     <ClassCompo3/>
     <ClassCompo4/>
     <Student name="Amit" address="Patna" score={2}/> 
     <ClassStudent name="Amit" address="Patna" score={2}/>
      <OnchangeText name="Amit" address="Patna"/> 
      <OnClickChangeText text1="Hello" text2="Bye"/>
    </>
  )
}

export default App
