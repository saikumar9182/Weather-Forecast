import "./App.css";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import HourlyForeCast from "./Components/HourlyForeCast.jsx";
import SevenDayForeCast from "./Components/SevenDayForeCast";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CurrentWeatherContext } from "./Helper/Context";
import { HourlyForeCastContext } from "./Helper/Context";
import { SevenDayForeCastContext } from "./Helper/Context";
import {CityContext} from './Helper/Context';

function App() {
  const [dataInput, setDataInput] = useState("");
  const [dataEnteredFlag, setDataEnteredFlag] = useState(false);
  const [CurrentWeatherContextFlag,setCurrentWeatherContextFlag]=useState(true);
  const [HourlyForeCastContextFlag,setHourlyForeCastContextFlag]=useState(true);
  const [SevenDayForeCastContextFlag,setSevenDayForeCastContextFlag]=useState(true);
  const [CityContextFlag,setCityContextFlag]=useState(false);

  function inputSetter(e) {
    if (e.keyCode == 13) {
      setDataEnteredFlag(true);
      setDataInput(e.target.value.slice(0, e.target.value.length));
    } else {
      setDataEnteredFlag(false);
    }
  }

  return (

    <CurrentWeatherContext.Provider value={{CurrentWeatherContextFlag,setCurrentWeatherContextFlag}}>
      <HourlyForeCastContext.Provider value={{HourlyForeCastContextFlag,setHourlyForeCastContextFlag}}>
        <SevenDayForeCastContext.Provider value={{SevenDayForeCastContextFlag,setSevenDayForeCastContextFlag}}>
          <CityContext.Provider value={{CityContextFlag,setCityContextFlag}}>

    <div className="App">
      <h1>Weather Forecast</h1>
      <input
        onKeyUp={inputSetter}
        type="text"
        placeholder="Enter your City Name"
      />

      {CityContextFlag?<h2 style={{color:"red", border:"1px solid white",backgroundColor:"#f8d7da",width:"180px",margin:"20px auto"}}>Invalid City <i class="fas fa-frown" style={{color:"red",backgroundColor:"white"}}></i></h2>:""}

      <div className="flexr">

       {CurrentWeatherContextFlag? <CurrentWeather
          dataInput={dataInput}
          dataEnteredFlag={dataEnteredFlag}
        />:""}
        
              {HourlyForeCastContextFlag?<HourlyForeCast dataInput={dataInput} dataEnteredFlag={dataEnteredFlag} setDataEnteredFlag={setDataEnteredFlag} />:""}

      </div>

      
      {SevenDayForeCastContextFlag?<SevenDayForeCast dataEnteredFlag={dataEnteredFlag} dataInput={dataInput}/>:""}
    </div>
    </CityContext.Provider>
    </SevenDayForeCastContext.Provider>

    </HourlyForeCastContext.Provider>
    </CurrentWeatherContext.Provider>



  );
}

export default App;
