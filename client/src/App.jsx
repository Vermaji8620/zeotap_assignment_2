import { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherSlider from "./components/WeatherSlider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [mockWeatherData, setMockWeatherData] = useState();

  const fetchData = async (city) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/fetch?fetchcity=${city}`
      );
      const resp = await axios.get(
        `http://localhost:5000/api/weather/fetchmockdata?fetchcity=${city}`
      );
      setWeatherData(response.data.thecitytobereturned);
      setMockWeatherData(resp.data.particularCityMockWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData("Kolkata");
      toast("Data fetched")
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header title="Real Time Weather Monitor" />

      <div className="flex gap-4 justify-center relative top-5">
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Delhi"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Delhi
        </button>
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Mumbai"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Mumbai
        </button>
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Chennai"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Chennai
        </button>
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Bengaluru"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Bengaluru
        </button>
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Kolkata"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Kolkata
        </button>
        <button
          className="bg-slate-600 p-3 pr-6 pl-6 cursor-pointer rounded-full"
          value={"Hyderabad"}
          onClick={async (e) => {
            await fetchData(e.target.value);
          }}
        >
          Hyderabad
        </button>
      </div>

      <WeatherSlider
        weatherData={weatherData}
        mockWeatherData={mockWeatherData}
      />
    </>
  );
};

export default App;
