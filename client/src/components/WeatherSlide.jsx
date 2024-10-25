import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineGraph } from "./Graph";

const WeatherSlide = ({ cityData }) => {
  const convertedTemp = cityData.main.temp - 273.15;
  useEffect(() => {
    (async () => {
      if (convertedTemp > 25) {
        try {
          const sendingMail = await axios.post("http://localhost:5000/mail", {
            fullname: "anonymous",
            email: "anonymous@gmail.com",
            message: `${cityData.name} has a temperature above 30°C`,
          });
          if (
            sendingMail.status == 200 &&
            sendingMail.data &&
            sendingMail.data.message
          ) {
            toast(sendingMail.data.message);
          } else if (
            sendingMail.status == 500 &&
            sendingMail.data &&
            sendingMail.data.error
          ) {
            toast(sendingMail.data.error);
          }
        } catch (err) {
          return toast(err.message);
        }
        toast(cityData.name + " has a temp above 30");
      }
    })();
  }, [convertedTemp, cityData.name]);

  const getDominantWeatherReason = (weather) => {
    switch (weather) {
      case "Clouds":
        return "The dominant weather condition is cloudy due to high humidity levels and the presence of a low-pressure system, which leads to cloud formation.";
      case "Rain":
        return "The dominant weather condition is rainy due to a combination of high humidity and a low-pressure system bringing moisture-laden air.";
      case "Clear":
        return "The dominant weather condition is clear due to a high-pressure system, which suppresses cloud formation and leads to clear skies.";
      case "Snow":
        return "The dominant weather condition is snowy due to low temperatures and high humidity, leading to snow precipitation.";
      default:
        return "The weather condition is influenced by various meteorological factors including temperature, humidity, pressure systems, and wind patterns.";
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString().split(",")[1];
  };

  return (
    <div className="p-6 rounded-lg shadow-md flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">{cityData.name}</h2>
          <p>Main Weather: {cityData.weather[0].main}</p>
          <p>
            Temperature: {Math.round(convertedTemp)}°C{" "}
            <span> ({cityData.main.temp})K</span>
          </p>
          <p>Feels Like: {Math.round(cityData.main.feels_like - 273.15)}°C</p>
          <p>Humidity: {cityData.main.humidity}%</p>
          <p>Wind Speed: {cityData.wind.speed} m/s</p>
          <p>Reason : {getDominantWeatherReason(cityData.weather[0].main)} </p>
        </div>
        <div>
          Last updated at: <br />
          {formatDate(cityData.dt)}
        </div>
      </div>
      <LineGraph cityData={cityData} />
      <div className="flex justfy-between flex-col">
        <p className="text-green-300">
          Min-Temp{" "}
          <span className="text-white"> - {cityData.main.temp_min} </span>
        </p>
        <p className="text-green-300">
          Max-Temp{" "}
          <span className="text-white"> - {cityData.main.temp_max}</span>
        </p>
      </div>
    </div>
  );
};
WeatherSlide.propTypes = {
  cityData: PropTypes.any.isRequired,
};

export default WeatherSlide;
