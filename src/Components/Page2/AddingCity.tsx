import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Clear from "../../assets/sun.png"
import Rainy from "../../assets/rainy.png"
import Cloudy from "../../assets/cloudy.png"
import "./Page2.scss"

 type ITask = {
  key: string,
  base: string 
}
  
  type Props ={
    task:any;
    index: number;
    api: ITask
  }
function AddingCity({task, api}: Props) {

  const [city, setCity] = useState<any>([])
  const [temp, setTemp] = useState<number>(0)
  const [weather, setWeather] = useState<string>('')

   useEffect(() => {
    fetch(`${api.base}weather?q=${task.name}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setCity(result)
        setTemp(result.main.temp)
        setWeather(result.weather[0].main)
        console.log(result);
        
      }) 
   }, [])
   

      
   const dateBuilder = (d: Date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  function removeCity(cit:string) {
    let items =JSON.parse(localStorage.getItem('items') ?? '[]');
    items = items.filter((city:any) => city.name !== cit)
    localStorage.setItem("items", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("items");
    }
  }

  function getItems() {
    JSON.parse(localStorage.getItem('items') ?? '[]');
  }

  useEffect(() =>{
    getItems()
  })
  
  return (
         <div style={{background: "#202b3ba1", padding: "30px", marginBottom: "10px", width: "100%", height: "auto"}} className="container rounded-5">
       <div style={{position: "relative"}} className='d-flex justify-content-between w-100 h-100'>
        <div className='d-flex align-items-center gap-3 w-75 flex-wrap'>
        <NavLink to={`/page-2/${city.name}`}><img style={{width: "100px",}} src={(weather === "Clear") ? Clear : (weather === "Clouds") ? Cloudy : (weather === "Rainy") ? Rainy : (weather === "Foggy") ? Cloudy : Clear}></img></NavLink>
          
        <div>
          <NavLink className={"link"} to={`/page-2/${city.name}`}>{city.name}</NavLink>
               <div>{dateBuilder(new Date())}</div>
        </div>
        </div>
        <div className='my-4'>
          <div className={"fs-1 fw-bold"}>
                {Math.round(temp)}°C 
             </div>
        </div>
        <div style={{position: "absolute", top:"-40px", right: "-30px"}}><button onClick={() => {
          removeCity(city.name)
  }} style={{width: "40px", height: "40px",borderRadius: "50%", border: "none", textAlign: "center", paddingTop: "6px", background: "#c91616bf"}}><h5 className='text-white'>X</h5></button></div>
      </div> 
      </div>
      )
  
}

export default AddingCity