import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CurrentWeather.css";

function CurrentWeather({ dataInput,dataEnteredFlag }) {
    const [currentTemperature, setCurrentTemperature] = useState("");
    const [currentWindSpeed, setCurrentWindSpeed] = useState("");
    const [currentHumidity, setCurrentHumidity] = useState("");
    const [currentState, setCurrentState] = useState("");
    

    

    if(dataEnteredFlag){
        

        const fetchCityData= async()=>{

            const res= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${dataInput}&appid=8931ece3d1ad872304ee0438c2e907c4`)
            .catch(err=>{
                
                console.log(err)});

                console.log(res);


        

            if(res!=undefined){
            setCurrentTemperature(Math.ceil(res.data.main.feels_like - 270));
            setCurrentWindSpeed(res.data.wind.speed);
            setCurrentHumidity(res.data.main.humidity);
            setCurrentState(res.data.weather[0].main);
            }


        }
        fetchCityData();

    }
    else{
        console.log("flag is not")
    }

    useEffect(() => {
        const successfulLookup = (position) => {
            const { latitude, longitude } = position.coords;

            const fetchCurrentWeather = async () => {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8931ece3d1ad872304ee0438c2e907c4`
                );

               

                setCurrentTemperature(Math.ceil(res.data.main.feels_like - 270));
                setCurrentWindSpeed(res.data.wind.speed);
                setCurrentHumidity(res.data.main.humidity);
                setCurrentState(res.data.weather[0].main);
                console.log(currentWindSpeed,currentTemperature);
            };

            fetchCurrentWeather();
        };

        const failedLookUp = () => {
            console.log("failed to load");
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successfulLookup, failedLookUp);
        }
    }, []);

    return (
        <div>
            <h1 id="currentWeatherTemperature">
                {currentTemperature}
                <span>&#8451;</span>
            </h1>

            <h3>{currentState}</h3>

            <h3 style={{ display: "inline", marginRight: "20px" }}>
                <i class="fa fa-tint" aria-hidden="true"></i>
                {currentHumidity}%
            </h3>
            <h3 style={{ display: "inline" }}>
                <i class="fas fa-wind" aria-hidden="true"></i>
                {currentWindSpeed}km/h
            </h3>
        </div>
    );
}

export default CurrentWeather;
