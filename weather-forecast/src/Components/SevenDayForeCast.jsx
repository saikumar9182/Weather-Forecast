import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

let oneFlag = true;

function SevenDayForeCast({ dataEnteredFlag, dataInput }) {
  const [sevenDaysContent, setSevenDaysContent] = useState([]);

  useEffect(() => {
    // Code that will be executed only for initial render//

    if (oneFlag) {
      const successfulLookup = (position) => {
        const { latitude, longitude } = position.coords;

        const fetchCurrentWeather = async () => {
          const res = await axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&{path}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
            )
            .catch((err) => console.log(err));

          let arr = res.data.daily;
          // Below Block Of Code converts UTC dt to date

          arr.map((item) => {
            let unix_timestamp = item.dt;
            var date = new Date(unix_timestamp * 1000);

            item.dt = date.getMonth() + 1 + "/" + date.getDate();
          });

          setSevenDaysContent(arr);
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
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&{path}&appid=624bc7ea92b246f0df3f1b95d9df47f7`
              )
              .catch((err) => console.log(err));

            let arr = res.data.daily;

            arr.map((item) => {
              let unix_timestamp = item.dt;
              var date = new Date(unix_timestamp * 1000);

              item.dt = date.getMonth() + 1 + "/" + date.getDate();
            });

            setSevenDaysContent(arr);
          };

          fetchForeCastWeather();
        }
      };

      getLatitudeAndLongitude();
    }
  }, [dataEnteredFlag]);

  return (
    <>
          <h1>7-day weather report</h1>

    <div className="flexro">
      {/* <h1>7-day weather report</h1> */}

      {sevenDaysContent.map((day) => (
        <div style={{border:"1px solid white"}} className="flexco">
          <div style={{ margin: "15px" }}>{day.dt}</div>
          <div style={{ margin: "15px" }}>
            {Math.floor(day.temp.max - 270)}
            <span>&#8451;</span>/{Math.floor(day.temp.min - 273.15)}
            <span>&#8451;</span>
          </div>

          <img
            src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
          ></img>
          <div style={{ margin: "15px" }}>{day.weather[0].main}</div>
        </div>
      ))}
    </div>
    </>
  );
}

export default SevenDayForeCast;
