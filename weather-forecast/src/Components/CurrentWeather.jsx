import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/CurrentWeather.css";

import { CityContext } from "../Helper/Context";

let oneFlag = true;

function CurrentWeather({ dataInput, dataEnteredFlag, setDataInput }) {
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [currentWindSpeed, setCurrentWindSpeed] = useState("");
  const [currentHumidity, setCurrentHumidity] = useState("");
  const [currentState, setCurrentState] = useState("");

  const { CityContextFlag, setCityContextFlag } = useContext(CityContext);

  useEffect(() => {
    if (oneFlag) {
      const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;

        const fetchCurrentWeather = async () => {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
          );

          setCurrentTemperature(Math.floor(res.data.main.feels_like - 273.15));
          setCurrentWindSpeed(res.data.wind.speed);
          setCurrentHumidity(res.data.main.humidity);
          setCurrentState(res.data.weather[0].main);
        };

        fetchCurrentWeather();
      };

      const failedLookUp = () => {
        console.log("failed to load");
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          successfulLookup,
          failedLookUp
        );
      }
      oneFlag = false;
    }

    if (dataEnteredFlag && dataInput != "") {
      const fetchCityData = async () => {
        const res = await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${dataInput}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
          )
          .catch((err) => {
            console.log(err);
          });

        if (res != undefined) {
          setCurrentTemperature(Math.floor(res.data.main.feels_like - 273.15));
          setCurrentWindSpeed(res.data.wind.speed);
          setCurrentHumidity(res.data.main.humidity);
          setCurrentState(res.data.weather[0].main);
          setCityContextFlag(false);
        } else if (res == undefined) {
          setCityContextFlag(true);

          // alert("No city details found");
        }
      };
      fetchCityData();
    }
  }, [dataEnteredFlag]);

  return (
    <div style={{}}>
      <h1>Current Weather</h1>
      <h3>
        <i class="fas fa-map-pin"></i> {dataInput}
      </h3>
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
        {currentWindSpeed}m/s
      </h3>
    </div>
  );
}

export default CurrentWeather;
