import React, { useEffect, useState } from 'react'
import s from "./Page1.module.scss"
import { PacmanLoader } from 'react-spinners'
import { Hourly } from './Hourly'
import Stuff from './Stuff'
import { NavLink, useNavigate } from 'react-router-dom';

export type ITask = {
  key: string,
  base: string 
}


type Props ={
  api: ITask
}

export default function Page1({api}: Props) {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<any>({});
  const [lon, setLon] = useState<number>(0)
  const [lat, setLat] = useState<number>(0)
  
	
  useEffect(() => {
    // geo()
      navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    });
  }, [])
    
     
    // const geo = async () => {
    //   const location = await axios.get("https://ipapi.co/json/")
    //   setLat(location.data.latitude)
    //   setLon(location.data.longitude)
    // }
  
useEffect(() => {
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          console.log(result);
        });
}, [lon, lat])

const goBack = () => {
		navigate(-1);
	}

  const dateBuilder = (d: Date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div style={{height: "auto"}} className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12 || weather.weather.main === "Clouds") ? s.app : s.warm) : s.app}>
       
      <div className={s.main}>
        <div className='d-flex justify-content-between fs-1'>
    <NavLink className={"text-white"} onClick={goBack} to={''}><i className='bx bx-left-arrow-alt'></i></NavLink>
    <NavLink className={"text-white"} to={'/page-2'}><i className='bx bx-right-arrow-alt'></i></NavLink>
    </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
           <div className={s.div1}>
          <div className={s.head}>
            <div className={s.name}>{weather.name}, {weather.sys.country} <span>{dateBuilder(new Date())}</span> <p style={{fontSize: "80px"}}>{Math.round(weather.main.temp)}°c</p></div>
            <div className={(weather.weather[0].main === "Clear") ? s.img : (weather.weather[0].main === "Clouds") ? s.clouds : (weather.weather[0].main === "Rainy") ? s.rainy : (weather.weather[0].main === "Foggy") ? s.clouds : s.img}></div>
          </div>
        </div>
        <div>
            <Hourly lat={lat} lon={lon} api={api} />
            <Stuff weather={weather}/>
        </div> 
          </div>
        
        ) : <PacmanLoader
        className={s.loader}
        color="#0b131e"
        size={60}
        speedMultiplier={4}
      />}
      </div>
    </div>
  )
}

