import "./App.css";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import HourlyForeCast from "./Components/HourlyForeCast.jsx";
import SevenDayForeCast from "./Components/SevenDayForeCast";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {CityContext} from './Helper/Context';



function App() {
  const [dataInput, setDataInput] = useState("");
  const [dataEnteredFlag, setDataEnteredFlag] = useState(false);
  
  const [CityContextFlag,setCityContextFlag]=useState(false);

  function inputSetter(e) {
    if (e.keyCode == 13) {
      setDataEnteredFlag(true);
      setDataInput(e.target.value.slice(0, e.target.value.length));
      
    } else {
      setDataEnteredFlag(false);
      
    }
  }
  

  useEffect(()=>{
    
      const successfulLookup = (position) => {
          const { latitude, longitude } = position.coords;

          const fetchCurrentLocation= async()=>{
              const result= await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c9dd1926572844bfbac5c27f69c5f3ce`);

              
              setDataInput(result.data.results[0].components.village)

          }

          fetchCurrentLocation();

          
      };

      const failedLookUp = () => {
          console.log("failed to load");
      };

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successfulLookup, failedLookUp);
      }
      
  


  },[])

  return (

    
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

       

 <CurrentWeather
          dataInput={dataInput}
          dataEnteredFlag={dataEnteredFlag}
          
        />
        
              <HourlyForeCast dataInput={dataInput} dataEnteredFlag={dataEnteredFlag} setDataEnteredFlag={setDataEnteredFlag} />


      </div>

      
      <SevenDayForeCast dataEnteredFlag={dataEnteredFlag} dataInput={dataInput}/>

    </div>
    </CityContext.Provider>
    



  );
}

export default App;
