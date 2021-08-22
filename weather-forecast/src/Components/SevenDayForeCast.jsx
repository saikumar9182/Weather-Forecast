import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

function SevenDayForeCast({ dataEnteredFlag, dataInput }) {
       const[sevenDaysContent,setSevenDaysContent]= useState([]);


  useEffect(() => {
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;

      const fetchCurrentWeather = async () => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&{path}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
        );
        console.log("seven", res);
        // console.log(res.data.daily);
        let arr=res.data.daily;

        arr.map(item=>{
            let unix_timestamp = item.dt;
            var date = new Date(unix_timestamp * 1000);
            // console.log(date.getUTCMonth());
            console.log(date.getDay());
            item.dt= date.getMonth()+1 +"/"+ date.getDate();
        })

        

        setSevenDaysContent(arr);
        console.log(sevenDaysContent);
      };

      fetchCurrentWeather();
    };

    const failedLookUp = () => {
      console.log("failed to load");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulLookup, failedLookUp);
    }
  }, [dataEnteredFlag]);

  return (
    <div className="flexc" >

        <h1>7-day weather report</h1>

        {
            
            sevenDaysContent.map((day)=>(
                <div className="flexr">
                <div style={{margin:"15px"}}>{day.dt}</div>
                <div style={{margin:"15px"}}>{Math.ceil(day.temp.max-270)}<span>&#8451;</span>/{Math.ceil(day.temp.min-270)}<span>&#8451;</span></div>

                <img src= {`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}></img>
                <div style={{margin:"15px"}}>{day.weather[0].main}</div>

                </div>
            ))
            
        }



      
    </div>
  );
}

export default SevenDayForeCast;
