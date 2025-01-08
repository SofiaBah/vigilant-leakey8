import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  function displayWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "fa6ac0eec48a37d445f557c6867cf755";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="submit"> Submit </button>
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature {Math.round(weather.temperature)}~C </li>
          <li>Windspeed {Math.round(weather.wind)}km/h</li>
          <li>Humidity level {weather.humidity}% </li>
          <li>
            <img src={weather.icon} alt="" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
