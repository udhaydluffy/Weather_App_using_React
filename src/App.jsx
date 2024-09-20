import './App.css'
import clearDIcon from './assets/01d.png'
import clearNIcon from './assets/01n.png'
import fewcloudD from './assets/02d.png'
import fewcloudN from './assets/02n.png'
import scloudD from './assets/03d.png'
import scloudN from './assets/03n.png'
import bcloudD from './assets/04d.png'
import bcloudN from './assets/04n.png'
import srainD from "./assets/09d.png"
import srainN from './assets/09n.png'
import rainD from './assets/10d.png'
import rainN from './assets/10n.png'
import stromd from './assets/11d.png'
import stromN from './assets/11n.png'
import snowD from './assets/13d.png'
import snowN from './assets/13n.png'
import mistD from './assets/50d.png'
import mistN from './assets/50n.png'
import windicon from './assets/windicon.png'
import humidityicon from './assets/humidityicon.png';
import temperatureicon from './assets/temperatureicon.png'; 
import searchicon from './assets/searchicon.png';
import { useEffect, useState } from 'react';

const WeatherDetails =({icon,temp,city,country,lat,alt,humidity,wind})=>{
  return(
    <>
  <div className="image">
    <img src={icon} alt="Image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div className="lat">Latitude
    <span>{lat}</span></div>
    <div className="altitude">Altitude
    <span>{alt}</span></div>
  </div>
  <div className="data-container">
      <div className="element">
        <img src={humidityicon} className='icon' alt="humidity" />
        <div className="data">
          <div className="humdity-percentage">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windicon} className='icon' alt="wind" />
        <div className="data">
          <div className="wind-speed">{wind} Km/h</div>
          <div className="text">Wind speed</div>
        </div>
      </div>
    </div>

  </>
  )
}
function App() {
  let apikey="0997eb22ffcd3f1cef3f0d77ee4a0ab9";//Use your Open Weather map API key
  const [text,setText]=useState("Coimbatore");
  const [icon,setIcon]=useState(clearDIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [alt,setAlt]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [cityerror,setCityerror]=useState(false);
  const [load,setLoad]=useState(false);

  const weatherIconMap={
    "01d": clearDIcon,
    "01n": clearNIcon,
    "02d": fewcloudD,
    "02n": fewcloudN,
    "03d": scloudD,
    "03n": scloudN,
    "04d": bcloudD,
    "04n": bcloudN,
    "09d": srainD,
    "09n": srainN,
    "10d": rainD,
    "10n": rainN,
    "11d": stromd,
    "11n": stromN, 
    "13d": snowD,
    "13n": snowN,
    "50d": mistD,
    "50n": mistN
  }

  const search = async()=>{
    setLoad(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      console.log(data)
      if(data.cod==="404"){
        console.error("City not found");
        alert("City not found")
        setCityerror(true)
        setLoad(false);
        return;
      }
      setHumidity(Math.floor(data.main.humidity));
      setWind(Math.floor(data.wind.speed));
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setAlt(data.coord.lon);
      const weatherIcon = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIcon]|| clearDIcon)

    }
    catch(error){
      console.error("An error occured:",error.message);
    }
    finally{
      setLoad(false);
    }
  }
  
const handleCity=(e)=>{
  setText(e.target.value);
};
const handleKey=(e)=>{
  if (e.key==="Enter"){
    search();
  }
}

useEffect(function(){
  search();
},[])

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder='Search city' onChange={handleCity} value={text} onKeyDown={handleKey} className='city-input' />
          <div className="search-icon">
            <img src={searchicon} onClick={search} alt="Search" />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} alt={alt}
        humidity={humidity} wind={wind} />

        <p className='copyright'>
          Designed by <span>Udhayan Govindharaj</span></p>
      </div>
       
    </>
  )
}

export default App
