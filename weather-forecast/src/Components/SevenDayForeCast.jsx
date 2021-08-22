import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"


let oneFlag=true;


function SevenDayForeCast({ dataEnteredFlag, dataInput }) {
       const[sevenDaysContent,setSevenDaysContent]= useState([]);


  useEffect(() => {

    if(oneFlag){
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;

      const fetchCurrentWeather = async () => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&{path}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
        )
        .catch(err=>console.log(err));
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
}

if(dataEnteredFlag==true ){
    var latitude;
    var longitude;
    const getLatitudeAndLongitude= async()=>{
      

       const res=
        await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${dataInput}&key=c9dd1926572844bfbac5c27f69c5f3ce`)
       .catch(err=>console.log(err));

       
        latitude= res.data.results[0].geometry.lat;
        longitude=  res.data.results[0].geometry.lng; 
        
        console.log("latitude is:",latitude);
        console.log("longitude is:",longitude);

        const fetchForeCastWeather= async()=>{
          const res= 
          await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&{path}&appid=624bc7ea92b246f0df3f1b95d9df47f7`)
          .catch(err=>console.log(err));

          // console.log(res);
    
          let arr= res.data.daily;
    
         arr.map(item=>{
            let unix_timestamp = item.dt;
            var date = new Date(unix_timestamp * 1000);
            // console.log(date.getUTCMonth());
            console.log(date.getDay());
            item.dt= date.getMonth()+1 +"/"+ date.getDate();
    
    
         })
    
        //  console.log(arr);
    
         setSevenDaysContent(arr);
    
        }
    
        fetchForeCastWeather();
    }

    getLatitudeAndLongitude();
    //  console.log("I am true, so I render");

    


    
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
