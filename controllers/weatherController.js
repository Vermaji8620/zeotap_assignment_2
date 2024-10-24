import axios from "axios";
import { WeatherData } from "../models/weatherData.js";

export const fetchWeatherData = async (req, res) => {
  try {
    const cities = [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Bangalore",
      "Kolkata",
      "Hyderabad",
    ];
    let allcitiesarray = [];
    for (let city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
      );

      allcitiesarray.push(response.data);
    }

    console.log(allcitiesarray);

    let eachcityarray = [];
    for (let i in allcitiesarray) {
      const weather = allcitiesarray[i]?.weather;
      const main = allcitiesarray[i]?.main;
      const wind = allcitiesarray[i]?.wind;
      const name = allcitiesarray[i]?.name;
      const id = allcitiesarray[i]?.id;
      const dt = allcitiesarray[i]?.dt;

      const everycityObj = {
        weather,
        main,
        wind,
        name,
        id,
        dt,
      };

      eachcityarray.push(everycityObj);
    }
    const newArrayToStore = new WeatherData({
      weatherData: eachcityarray,
    });

    await newArrayToStore.save();
    res
      .status(200)
      .json({ eachcityarray, message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
