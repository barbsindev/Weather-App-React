import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ForecastInfo/ForecastInfo.scss";
import "../DailyForecast/DailyForecast.scss";
import ForecastDays from "../ForecastDays/ForecastDays";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }
  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className=" forecast p-0 m-0 row">
          {forecast.map(function (dailyforecast, index) {
            if (index < 5) {
              return (
                <div className="col p-0 m-0" key={index}>
                  <ForecastDays data={dailyforecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
