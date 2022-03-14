import React, { useState } from "react";
import "./Searchbar.scss";
import axios from "axios";
import WeatherInfo from "../Weather/WeatherInfo/WeatherInfo";
import DailyForecast from "../Forecast/DailyForecast/DailyForecast";
import clear from "../../assets/clear.jpg";
import cloudy from "../../assets/cloudy.jpg";
import fog from "../../assets/fog.jpg";
import partlycloudy from "../../assets/partly-cloudy.jpg";
import rain from "../../assets/rain.jpg";
import sleet from "../../assets/sleet.jpg";
import snow from "../../assets/snow.jpg";
import sunny from "../../assets/sunny.jpg";
import thunder from "../../assets/thunder.jpg";
import { ReactComponent as Search } from "../../assets/search.svg";

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
                <Search />
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
