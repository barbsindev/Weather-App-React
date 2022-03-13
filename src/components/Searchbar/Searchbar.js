import React, { useState } from "react";
import "./Searchbar.scss";
import axios from "axios";
import WeatherInfo from "../Weather/WeatherInfo";
import clear from "../../assets/clear.jpg";
import cloudy from "../../assets/cloudy.jpg";
import fog from "../../assets/fog.jpg";
import partlycloudy from "../../assets/partly-cloudy.jpg";
import rain from "../../assets/rain.jpg";
import sleet from "../../assets/sleet.jpg";
import snow from "../../assets/snow.jpg";
import sunny from "../../assets/sunny.jpg";
import thunder from "../../assets/thunder.jpg";
import DailyForecast from "../Forecast/DailyForecast/DailyForecast";

export default function Searchbar(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [weatherData, setWeatherData] = useState({ ready: false });

  const imageMapping = {
    Clear: clear,
    Clouds: cloudy,
    Mist: fog,
    Smoke: cloudy,
    Haze: partlycloudy,
    Dust: fog,
    Fog: fog,
    Sand: cloudy,
    Ash: cloudy,
    Squal: cloudy,
    Tornado: thunder,
    Snow: snow,
    Rain: rain,
    Drizzle: rain,
    Thunderstorm: thunder,
    Sunny: sunny,
    Sleet: sleet,
  };

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      city: response.data.name,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      background: response.data.weather[0].main,
    });
  }

  function search() {
    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    console.log(process.env.REACT_APP_WEATHER_API_KEY, "api");
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCity(event) {
    setCity(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div
        className="container-fluid p-0"
        style={{
          backgroundImage: `url(${imageMapping[weatherData.background]})`,
        }}
      >
        <header>
          <div className="searchbar">
            <form className="input-group mb-3" onSubmit={handleSubmit}>
              <input
                type="search"
                className="form-control"
                placeholder="Enter city..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={handleCity}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </form>
          </div>
        </header>
        <section>
          <WeatherInfo data={weatherData} className="p-0" />
          <DailyForecast coordinates={weatherData.coordinates} />
        </section>
      </div>
    );
  } else {
    search();
    return "loading";
  }
}
