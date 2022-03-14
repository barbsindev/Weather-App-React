import React from "react";
import "./WeatherInfo.scss";
import FormattedDate from "../FormattedDate";
import WeatherConversion from "../WeatherConversion/WeatherConversion";

export default function WeatherInfo(props) {
  return (
    <section className="weather-info">
      <FormattedDate date={props.data.date} />
      <div className="city">
        <h2 className="city__current m-0">{props.data.city}</h2>
      </div>
      <div className="row">
        <div className="col">
          <WeatherConversion celsius={props.data.temperature} />
          <h5 className="temperature__description  text-capitalize m-0">
            {props.data.description}
          </h5>
        </div>
        <div className="col description">
          <p className="description__attributes m-0">
            Humidity:{" "}
            <span className="desciption__humidity"> {props.data.humidity}</span>
            % <br />
            Wind:{" "}
            <span className="description__wind">
              {Math.round(props.data.wind)}
            </span>{" "}
            km/h
          </p>
        </div>
      </div>
    </section>
  );
}
