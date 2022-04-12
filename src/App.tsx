import "./App.css";
// import axios from "axios";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export interface DataType {
  name: string, 
  main: {
    temp: number, 
    feels_like: number, 
    temp_min: number,
    temp_max: number, 
    pressure: number,
    humidity: number
  },
  weather: [{
    main: string, 
    description: string, 
    icon: string
  }],
  visibility: number, 
  wind: {speed: number},
  sys: {country: string},
}

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  // unit can be 'metric' or 'imperial', 'standard' by default
  const unit = "metric";

  const [weatherData, setWeatherData] = useState<DataType|undefined>();
  const [location, setLocation] = useState<string|null>("");
  // const [weatherCards, setWeatherCards] = useState([{}]);
  // const {
  //   name,
  //   main: {temp, feels_like, temp_min, temp_max, pressure, humidity}, 
  //   weather: {main, description},
  //   sys: {country}
  // } = weatherData; 

  React.useEffect(() => {
    console.log("Inside useEffect", weatherData);
  }, [weatherData]);

  const searchWeather = async (location: string): Promise<void> => {
    let resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`
    );
    let data = await resp.json();
    console.log("data is", data);
    setWeatherData(data);
    console.log("weatherdata is", weatherData);
    console.log("--------------");
  };

  return (
    <div className='container'>
      <div>
        <SearchBar
          searchWeather={searchWeather}
          setLocation={setLocation}
          location={location}
          weatherData={weatherData}
        />
      </div>
      <div>
        {/* get around to the situation that weatherData might be undefined */}
        {weatherData && <SearchResults weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;
