import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/HourlyForeCast.css";

let oneFlag = true;

function HourlyForeCast({ dataInput, dataEnteredFlag, setDataEnteredFlag }) {
  const [eachHourContents, setEachHourContents] = useState([]);

  useEffect(() => {
    // Code that will be executed only for initial render//

    if (oneFlag) {
      const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;

        const fetchCurrentWeather = async () => {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=624bc7ea92b246f0df3f1b95d9df47f7`
          );

          // Below Block Of Code converts UTC dt to local time
          let arr = res.data.hourly;

          arr.map((item) => {
            let unix_timestamp = item.dt;

            var date = new Date(unix_timestamp * 1000);

            var hours = date.getHours();

            var minutes = "0" + date.getMinutes();

            var seconds = "0" + date.getSeconds();

            var formattedTime =
              hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

            item.dt = formattedTime;
          });

          setEachHourContents(arr);
        };

        fetchCurrentWeather();
      };

      const failedLookUp = () => {
        console.log("failed to load");
      };

      // Checking if browser supports location feature

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          successfulLookup,
          failedLookUp
        );
      }
      oneFlag = false;
    }

    // Below Block Of Code is Re-Render code i.e., code that will be executed everytime a city name is entered.//////////////////////////////////////////////

    if (dataEnteredFlag == true && dataInput != "") {
      var latitude;
      var longitude;
      const getLatitudeAndLongitude = async () => {
        const res = await axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${dataInput}&key=c9dd1926572844bfbac5c27f69c5f3ce`
          )
          .catch((err) => console.log(err));

        if (res.data.results.length != 0) {
          latitude = res.data.results[0].geometry.lat;
          longitude = res.data.results[0].geometry.lng;

          const fetchForeCastWeather = async () => {
            const res = await axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=624bc7ea92b246f0df3f1b95d9df47f7`
              )
              .catch((err) => console.log(err));

            let arr = res.data.hourly;

            arr.map((item) => {
              let unix_timestamp = item.dt;

              var date = new Date(unix_timestamp * 1000);
              // // Hours part from the timestamp
              var hours = date.getHours();
              // // Minutes part from the timestamp
              var minutes = "0" + date.getMinutes();
              // // Seconds part from the timestamp
              var seconds = "0" + date.getSeconds();

              // // Will display time in 10:30:23 format
              var formattedTime =
                hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

              item.dt = formattedTime;
            });

            setEachHourContents(arr);
          };

          fetchForeCastWeather();
        }
      };

      getLatitudeAndLongitude();
    }
  }, [dataEnteredFlag]);

  return (
    <div className="flexc" className="container hour-container">
      <h1>Next 48 hrs Fore Cast</h1>

      {eachHourContents.map((hour) => (
        <div className="flexa" style={{ border: "1px solid black" }}>
          <div>
            <h3>
              <i class="fas fa-wind" aria-hidden="true"></i>
              {hour.wind_speed}m/s
            </h3>
            <h3>
              <i class="fas fa-tint" aria-hidden="true"></i>
              {hour.humidity}%
            </h3>
            <h2>{hour.dt}</h2>
          </div>

          <div>
            <h2 style={{ fontSize: "50px", marginTop: "0" }}>
              {Math.floor(hour.feels_like - 273.15)}
              <span>&#8451;</span>
            </h2>
            <h2>{hour.weather[0].main}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HourlyForeCast;
