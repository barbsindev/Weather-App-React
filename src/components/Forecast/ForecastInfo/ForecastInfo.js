import React from "react";
import WeatherIcon from "../Weather/WeatherIcon";

export default function ForecastInfo(props) {
  function hours() {
    let date = new Date(props.data.dt * 1000);
    let hour = date.getHours();
    return `${hour}:00`;
  }
  function temperature() {
    let temperature = Math.round(props.data.main.temp);
    return `${temperature}`;
  }

  return (
    <div className="col">
      {temperature()}°
      <WeatherIcon code={props.data.weather[0].icon} />
      {hours()}
    </div>
  );
}
