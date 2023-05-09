import Moment from 'react-moment'
import Sunrise from "../../assets/sunrise.png"
import Sunset from "../../assets/sunset.png"
type Props = {
    weather: any
}

const Stuff = (weather: Props) => {
  console.log(weather.weather);
  
  return (
    <div style={{background: "#202b3ba1", color: "white", padding: "30px", marginTop: "20px", width: "97%", height: "auto", }} className="rounded-5">
      <h5>AIR CONDITIONS</h5>
<div style={{display: "flex", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"}}>
        <div className='w-100'>
        <p className="w-100 fs-3"><i className='bx bxs-thermometer' ></i>Real Feel <br /><span className='fs-1 fw-bold mx-4'>
          {Math.round(weather.weather.main.feels_like)}°</span></p>
      </div>
      <div className='w-100'>
        <p className="w-100 fs-3"><i className='bx bx-wind' ></i>Wind <br /><span className='fs-1 fw-bold mx-4'>
          {Math.round(weather.weather.wind.speed)}km/h</span></p>
      </div>
      </div>
      <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"}}>

      <div className='w-100'>
        <p className="w-100 fs-3"><i className='bx bx-cloud-light-rain' ></i>Rain <br /><span className='fs-1 fw-bold mx-4'>
          {Math.round(weather.weather.clouds.all)}%</span></p>
      </div>
      <div className='w-100'>
        <p className="w-100 fs-3"><i className='bx bxs-shower' ></i>Humidity <br /><span className='fs-1 fw-bold mx-4'>
          {Math.round(weather.weather.main.feels_like)}%</span></p>
      </div>
      </div>
      <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"}}>

      <div className='w-100'>
        <p className="w-100 fs-3"><img src={Sunset} alt="" />Sunset <br /><span className='fs-1 fw-bold mx-4'>
        <Moment format ="HH:mm">{(weather.weather.sys.sunset)}</Moment></span></p>
      </div>
      <div className='w-100'>
        <p className="w-100 fs-3"><img src={Sunrise} alt="" />Sunrise <br /><span className='fs-1 fw-bold mx-4'>
          <Moment format ="hh:mm">{(weather.weather.sys.sunrise)}</Moment></span></p>

      </div>
      </div>
    </div>
  )
}

export default Stuff
