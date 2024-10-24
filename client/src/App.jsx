import { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherSlider from "./components/WeatherSlider";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/weather/fetch"
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // const interv = setInterval(() => {
    //   console.log("ksfdsh")
    //   fetchData();
    // }, 10 * 1000);
    // return () => {
    //   clearInterval(interv);
    // };
  }, []);

  return (
    <div className="">
      <Header title="Weather Monitoring App" />
      <WeatherSlider weatherData={weatherData} />
    </div>
  );
};

export default App;
