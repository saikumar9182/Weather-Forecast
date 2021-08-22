import "./App.css";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import HourlyForeCast from "./Components/HourlyForeCast.jsx";
import SevenDayForeCast from "./Components/SevenDayForeCast";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dataInput, setDataInput] = useState("");
  const [dataEnteredFlag, setDataEnteredFlag] = useState(false);

  function inputSetter(e) {
    if (e.keyCode == 13) {
      setDataEnteredFlag(true);
      setDataInput(e.target.value.slice(0, e.target.value.length));
    } else {
      setDataEnteredFlag(false);
    }
  }

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input
        onKeyUp={inputSetter}
        type="text"
        placeholder="Enter your City Name"
      />

      <div className="flexr">
        <CurrentWeather
          dataInput={dataInput}
          dataEnteredFlag={dataEnteredFlag}
        />
              <HourlyForeCast dataInput={dataInput} dataEnteredFlag={dataEnteredFlag} setDataEnteredFlag={setDataEnteredFlag} />

      </div>

      
      <SevenDayForeCast dataEnteredFlag={dataEnteredFlag} dataInput={dataInput}/>
    </div>
  );
}

export default App;
