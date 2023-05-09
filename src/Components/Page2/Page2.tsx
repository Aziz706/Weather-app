import React, { useEffect, useState } from 'react'
import './Page2.scss'
import AddingCity from './AddingCity'
import { NavLink, useNavigate } from 'react-router-dom'

export type ITask = {
  key: string,
  base: string 
}

type Props = {
  api: ITask
}



export default function Page2({api}: Props) {
  const [query, setQuery] = useState<string>('');
  const [weather, setWeather] = useState<any>(() => JSON.parse(localStorage.getItem('items') ?? '[]'));
  const navigate = useNavigate();
	
  const search = (evt: React.KeyboardEvent<HTMLInputElement>):void => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => {
          if (!res.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          } 
          return res.json() })
        .then(result => {
          let obj = {
            name: result.name
        }
          weather.push(obj)
          setWeather([...weather])
          setQuery('');
        });
    }
  }
const goBack = () => {
		navigate(-1);
	}
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(weather));
  }, [weather]);
  

  return (
    <div style={{height: "auto"}} className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'app' : 'warm') : 'app'}>
      <main>
     
      <div className="search-box">
      <NavLink onClick={goBack} to={''}><i style={{fontSize: "30px", marginTop: "-10px", marginLeft: "-10px", marginRight: "10px", color: "white"}} className='bx bx-left-arrow-alt' ></i></NavLink>
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for cities..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(weather.length === 0) ? (
        <h1 className='text-center'>No cities yet</h1>
         ) : <div>
          <div className="location-box">
							{weather.map((task:any, index:number) => 
                <AddingCity api={api} task={task} index={index} key={index} />
							)}
          </div>
        </div>}
      </main>
    </div>
  )
}

