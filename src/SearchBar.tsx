import React from "react";
import { DataType } from "./App";

interface SearchBarProps {
    searchWeather(location: string): void, 
    setLocation(location: string): void, 
    location: string|null,
    weatherData: DataType|undefined,
}

export default function SearchBar({
  searchWeather,
  setLocation,
  location,
  weatherData,
}: SearchBarProps) {
  const handleSearch = (e: { key: string; }) => {
    if (e.key === "Enter") {
      console.log(location);
      searchWeather(location!);
      setLocation("");
      console.log("weatherdata is also", weatherData);
    }
  };

  return (
    <div>
      <input
        className='input'
        type='text'
        placeholder='Enter Location . . .'
        onChange={(e) => setLocation(e.target.value)}
        value={location!}
        onKeyPress={handleSearch}
      ></input>
    </div>
  );
}

