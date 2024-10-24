import Graph from "./Graph";
import PropTypes from "prop-types";

const WeatherSlide = ({ cityData }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString().split(",")[1];
  };

  return (
    <div className="p-6 rounded-lg shadow-md flex flex-col gap-10">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">{cityData.name}</h2>
          <p>Main Weather: {cityData.weather[0].main}</p>
          <p>
            Temperature: {Math.round(cityData.main.temp - 273.15)}°C{" "}
            <span> ({cityData.main.temp})K</span>
          </p>
          <p>Feels Like: {Math.round(cityData.main.feels_like - 273.15)}°C</p>
          <p>Humidity: {cityData.main.humidity}%</p>
          <p>Wind Speed: {cityData.wind.speed} m/s</p>
        </div>
        <div>
          Last updated at: <br />
          {formatDate(cityData.dt)}
        </div>
      </div>
      <Graph cityData={cityData} />
    </div>
  );
};
WeatherSlide.propTypes = {
  cityData: PropTypes.any.isRequired,
};

export default WeatherSlide;
