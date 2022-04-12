import React from "react";
import { useState } from "react";
import { DataType } from "./App";

export interface SearchResultsProps {
    weatherData: DataType;
}

export default function SearchResults({weatherData}: SearchResultsProps) {
  const [detailName, setDetailName] = useState("noDetail");
  const [btnText, setBtnText] = useState("More");
  const [btnPosition, setBtnPosition] = useState("btnNoDetail");

  const handleShowDetail = () => {
    detailName === "noDetail"
      ? setDetailName("detail")
      : setDetailName("noDetail");
    detailName === "noDetail" ? setBtnText("Less") : setBtnText("More");
    btnPosition === "btnNoDetail"
      ? setBtnPosition("btnWithDetail")
      : setBtnPosition("btnNoDetail");
  };

  // function for capitalize the first letter of a sentence
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>Please enter in a city to get the weather of.</p>
        </div>
      ) : (
        <div className='resultContainer'>
          <div className='general'>
            <div>
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <img
              className='weatherImg'
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt='PictureForWeather'
            />
            <div className='temp'>{Math.round(weatherData.main.temp)}°C</div>
            <div className='des'>
              {capitalizeFirstLetter(weatherData.weather[0].description)}
            </div>
          </div>

          <div className={detailName}>
            <hr></hr>
            <div>Feels Like: {Math.round(weatherData.main.feels_like)}°C</div>
            <div>Lowest Temp: {Math.round(weatherData.main.temp_min)}°C</div>
            <div>Highest Temp: {Math.round(weatherData.main.temp_max)}°C</div>
            <div>Pressure: {weatherData.main.pressure}hPa</div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind Speed: {weatherData.wind.speed}m/s</div>
            <div>Visibility: {weatherData.visibility}meter</div>
          </div>
          <div className={btnPosition}>
            <button className='moreBtn' onClick={handleShowDetail}>
              {btnText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
