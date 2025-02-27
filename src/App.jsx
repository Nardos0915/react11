// import React, { useState } from 'react'
// import axios from 'axios'

// function App() {

//  const [fact,setFact]=useState('')
//   const catFact=async()=>{
//     const res= await axios.get('https://catfact.ninja/fact')
//     // const data=await res.json() axious doesn't need to convert from obj format to json
//     console.log(res.data)
//     setFact(res.data.fact)

//   }


//   return (
//     <div>
//       <button onClick={catFact}>give me a cat fact </button>
//       <div>{fact}</div>
//     </div>
//   )
// }

// export default App












// 


import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!location) return;

      setLoading(true);
      setWeatherData(  {
        feelsLike:'',
        humidity:'' ,
        windSpeed:'' ,
        condition: '',
      });

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fb4b0ffb4fcb84bb70ff73f4de4ae6cd`
      );



      const data = await response.json();
      setWeatherData({
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: (data.wind.speed * 3.6).toFixed(2),
        condition: data.weather[0].description,
      });
    }


    catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();

    }
  };

  return (
    <div className='app'>

      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleKeyPress} className='location-input' 
      />


      {loading && <div className='load d-flex '>Loading...</div>}


      <div className="weather-header d-flex justify-content-between w-75">
        <div>
        <h3>{location} </h3>
        <h1  className='header1'>{weatherData.feelsLike}  
          </h1>
        </div>

          <div><h3 className='custom-rotate'>{weatherData.condition}</h3></div>


      </div>

      {weatherData && (
        <div className='weather-data'>
          <div className='data-item'>

            <div>
           <h6>{weatherData.feelsLike}</h6> 
              <h5> Feels Like</h5>
              </div>

          </div>
         <div className='data-item'>

          <div>
         <h6>{weatherData.humidity}</h6> 
            <h5> Humidity</h5>
            </div>

         </div>

         <div className='data-item'>

          <div>
           <h6>{weatherData.windSpeed} KPH</h6>  
             <h5>Wind Speed</h5>
            </div>
         </div>



        </div>
      )}
    </div>
  );
}

export default App;

