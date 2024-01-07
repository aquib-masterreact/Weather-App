import  { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './Component/NavigationBar';
import WeatherCard from './Component/WeatherCard';
import axios from 'axios';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [locations, setLocations] = useState(["Kolkata","Delhi","Mumbai","Chennai"]);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    
    axios.get('http://localhost:3000/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const fetchWeatherData = (location) => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=71dfe7f5918944efa3d125250240301&q=${location}&days=3`)
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  };

  const handleLocationClick = (location) => {
    if (location === "Add More") {
      const newLocation = prompt("Enter a new location:");
      if (newLocation) {
       
        axios.post('http://localhost:3000/locations', { name: newLocation })
          .then(response => {
            console.log(response.data.message);
            setLocations([...locations, { name: newLocation }]);
          })
          .catch(error => console.error('Error adding location:', error));
      }
    } else {
      setSelectedLocation(location);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Weather App</h1>
      <div className='bar'>
        {locations.map((location, index) => (
          <div className="Navigation" key={index}>
            <NavigationBar city={location.name} onClick={() => handleLocationClick(location.name)} />
          </div>
        ))}
        <NavigationBar city={"Add More"} onClick={() => handleLocationClick("Add More")} />
      </div>

      {selectedLocation && (
        <div>
          <h2>{selectedLocation}</h2>
          {weatherData && (
            <WeatherCard weatherData={weatherData} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
