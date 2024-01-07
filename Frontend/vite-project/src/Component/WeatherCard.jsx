/* eslint-disable react/prop-types */
import "./comp.css";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.current || !weatherData.forecast) {
    return <div>Loading...</div>;
  }

  const {
    location: { name, region, country },
    current: {
      last_updated,
      temp_c: temperatureC,
      temp_f: temperatureF,
      condition: { text: currentWeather },
      is_day,
    },
    forecast: { forecastday },
  } = weatherData;

  return (
    <div className="cardContainer">
      {forecastday.map((day, index) => (
        <div key={index} className="card">
          <p className="city">
            {name}, {region}, {country}
          </p>
          <p className="last-updated">Last Updated: {last_updated}</p>
          <p className="current-weather">{currentWeather}</p>
          <p className="temp">{temperatureC}°C / {temperatureF}°F</p>
          <p className="is-day">{is_day ? "Daytime" : "Nighttime"}</p>

          
          <div className="forecast">
            <p className="date">{day.date}</p>
            <p className="daily-condition">{day.day.condition.text}</p>
            <p className="avg-temp">
              {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F (Avg)
            </p>
            <p className="max-temp">
              {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F (Max)
            </p>
            <p className="min-temp">
              {day.day.mintemp_c}°C / {day.day.mintemp_f}°F (Min)
            </p>
            <p className="uv-index">UV Index: {day.day.uv}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherCard;
