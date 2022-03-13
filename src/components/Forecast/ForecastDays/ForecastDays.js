import React from "react";
import WeatherIcon from "../../Weather/WeatherIcon";
import "./ForecastDays.scss";
export default function ForecastDay(props) {
  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°|`;
  }
  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  return (
    <div className="WeatherForecast">
      <div className="WeatherForecast__temperatures">
        <span className="WeatherForecast__temperature-max">
          {maxTemperature()}
        </span>{" "}
        <span className="WeatherForecast__temperature-min">
          {minTemperature()}
        </span>
      </div>
      <WeatherIcon code={props.data.weather[0].icon} />
      <div className="WeatherForecast__day">{day()}</div>
    </div>
  );
}
