import React, { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Clear from "../../assets/sun.png"
import Clouds from "../../assets/cloudy.png"
import Rainy from "../../assets/rainy.png"
// import s from "./Page1.module.scss"

export type ITask = {
  key: string;
  base: string;
};

type Props = {
  api: ITask;
  lon: number;
  lat: number;
};



export const Hourly = ({ api, lon, lat }: Props) => {
  const [hourly, setHourly] = useState<any>([]);
  useEffect(() => {
    fetch(`${api.base}forecast?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setHourly(result.list);
      });
      
  }, [lon, lat]);

  
  const item = hourly.map(
        (hour: any, index: number) => (
          <div key={index} style={{display:"flex", flexDirection: "column", borderRight: "1px solid #787e88", padding: "15px", justifyContent: "center", alignItems: "center"}}>
            <p className="text-center">{hour.dt_txt}</p>
            <img style={{width: "65px", height: "60px", backgroundPosition: "center", backgroundSize: "contain"}} src={(hour.weather[0].main === "Clear") ? Clear : (hour.weather[0].main === "Clouds") ? Clouds : (hour.weather[0].main === "Rainy") ? Rainy : (hour.weather[0].main === "Foggy") ? Clouds : Clear} />
            <p className="fs-2 fw-bold text-white mx-2">{Math.floor(hour.main.temp )}°</p>
          </div>))

   const responsive = {
    0: {items: 3},
    568: { items: 5 },
    1024: { items: 7 },
};

  return (
      <div style={{background: "#202b3ba1", color: "white", padding: "30px", marginLeft: "0", width: "97%", height: "300px"}} className=" rounded-5">
      <h5>FORECAST TODAY & 4 DAYS </h5>
      <AliceCarousel
        mouseTracking
        items={item}
        controlsStrategy="alternate"
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        
    />
    </div>
  );
};
