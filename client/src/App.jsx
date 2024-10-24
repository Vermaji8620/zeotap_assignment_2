import { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherSlider from "./components/WeatherSlider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const interv = setInterval(() => {
      toast("Data reloaded successfully after 20 secs", { autoClose: 2000 });
      fetchData();
    }, 20 * 1000);
    return () => {
      clearInterval(interv);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Header title="Real Time Weather Monitor" />
      <WeatherSlider weatherData={weatherData} />
    </>
  );
};

export default App;
