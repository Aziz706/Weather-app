import React, { useEffect, useState } from 'react'
import s from "../Page1/Page1.module.scss"
import { PacmanLoader } from 'react-spinners'
import { Hourly } from '../Page1/Hourly'
import Stuff from '../Page1/Stuff'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

export type ITask = {
  key: string,
  base: string 
}


type Props ={
  api: ITask
}

export default function Page2id({api}: Props) {
  const { id } = useParams();
  const [weather, setWeather] = useState<any>({});
  const [sunset, setSunset] = useState<any>({})
  const navigate = useNavigate();
	
useEffect(() => {
  fetch(`${api.base}weather?q=${id}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setSunset(result.sys)
          console.log(result);
        });
}, [id])


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
      <NavLink onClick={goBack} to={''}><i style={{fontSize: "30px", marginTop: "-10px", marginLeft: "-10px", marginRight: "10px", color: "white"}} className='bx bx-left-arrow-alt' ></i></NavLink>

        {(typeof weather.main !== "undefined") ? (
          <div>
           <div className={s.div1}>
          <div className={s.head}>
            <div className={s.name}>{weather.name}, {weather.sys.country} <span>{dateBuilder(new Date())}</span> <p style={{fontSize: "80px"}}>{Math.round(weather.main.temp)}°c</p></div>
            <div className={(weather.weather[0].main === "Clear") ? s.img2 : (weather.weather[0].main === "Clouds") ? s.clouds : (weather.weather[0].main === "Rainy") ? s.rainy : (weather.weather[0].main === "Foggy") ? s.clouds : s.img2}></div>
          </div>
        </div>
        <div>
            <Hourly lat={weather.coord.lat} lon={weather.coord.lon} api={api} />
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

