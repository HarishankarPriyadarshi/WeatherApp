//https://api.openweathermap.org/data/2.5/weather?q=raipur&appid=7aa50239810ae0b12d65f804af38c6b1

import React, { useState , useEffect  } from 'react'
import Weathercard from "./weathercard";
import "./style.css";
import { cleanup } from '@testing-library/react';
// import * as dotenv from 'dotenv'

// dotenv.config()

const Temperature = () => {
  const [searchValue , setSearchValue] = useState("Raipur");
  const [ tempInfo , setTempInfo] = useState({});

  const getWeatherInfo = async() => {
    try {
      // let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7aa50239810ae0b12d65f804af38c6b1`;

      // const res = await fetch(url);
      // const data = await res.json();
      if (!searchValue.trim()) {
        // If the search value is empty or contains only whitespace
        console.log("Please enter a city name");
        return;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7aa50239810ae0b12d65f804af38c6b1`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        // If the response is not successful (e.g., 404 for invalid city name)
        console.log(`Given city name: ${searchValue} is invalid`);
        return;
      }
    

      const{temp, humidity, pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const { name } = data;
      const{speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      if(res.ok)
      {console.log("sucessfully data has been deliverd")}
      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log("something goes wrong there:", error);
    }
   };

  useEffect(() => {
    getWeatherInfo();
  },[]);

  return (
    <>
      <div className="wrap"> 
        <div className="serach">
        <input type="search" placeholder="search..." autoFocus 
        id="search"
        className="searchTerm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        />

           <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
           </button>
        
             
      </div>
      </div>
      <Weathercard tempInfo= {tempInfo}/>
    </>
  )
}

export default Temperature  