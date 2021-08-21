import "./App.css";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dataInput,setDataInput]= useState("");
  const [dataEnteredFlag,setDataEnteredFlag]=useState(false);

  // function InputDataSetter(e){
  //   setDataInput(e.target.value);

  // }

  function inputSetter(e){
    if(e.keyCode==13){
      setDataEnteredFlag(true);
      setDataInput(e.target.value.slice(0,e.target.value.length));
      

    }
    else{
      setDataEnteredFlag(false);
    }
    // setDataInput(e.target.value);

  }

  // console.log(flag);
  



  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input  onKeyUp={inputSetter} type="text" placeholder="Enter your City Name" />

      <div className="flexr">
        

      <CurrentWeather  dataInput= {dataInput} dataEnteredFlag={dataEnteredFlag} />
      
      </div>
    </div>
  );
}

export default App;
