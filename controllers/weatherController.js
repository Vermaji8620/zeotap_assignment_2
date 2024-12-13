import axios from "axios";
import { WeatherData } from "../models/weatherData.js";
import { transformedData } from "./dailyWeatherSummary.js";

const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fetchWeatherData = async (req, res) => {
  let fetchcity = req.query.fetchcity;
  fetchcity = capitalize(fetchcity);
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
    let thecitytobereturned = null;
    for (let eachcity in eachcityarray) {
      if (eachcityarray[eachcity].name == fetchcity)
        thecitytobereturned = eachcityarray[eachcity];
    }
    if (thecitytobereturned) {
      res.status(200).json({
        message: "Data fetched successfully",
        thecitytobereturned,
      });
    } else {
      res.status(404).json({
        message: "City not found",
      });
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export const fetchMockData = (req, res) => {
  try {
    let fetchcity = req.query.fetchcity;
    fetchcity = capitalize(fetchcity);
    const transformDatareceived = transformedData;
    let cityWeatherArray = [];

    for (let item of transformDatareceived) {
      let cityObject = {
        city: item.city,
        data: {
          date: item.date,
          avgTemp: item.avgTemp,
          maxTemp: item.maxTemp,
          minTemp: item.minTemp,
          dominantWeather: item.dominantWeather,
        },
      };
      cityWeatherArray.push(cityObject);
    }

    let groupedCityWeatherArray = cityWeatherArray.reduce((acc, current) => {
      let city = current.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(current.data);
      return acc;
    }, {});

    let finalCityWeatherArray = Object.keys(groupedCityWeatherArray).map(
      (city) => {
        return {
          city: city,
          data: groupedCityWeatherArray[city],
        };
      }
    );

    cityWeatherArray = finalCityWeatherArray;
    let particularCityMockWeather = cityWeatherArray.find(
      (eachobj) => eachobj.city.toLowerCase() == fetchcity.toLowerCase()
    );

    if (!particularCityMockWeather) {
      res.status(404).json({
        message: "City not found in mock data",
      });
    } else {
      res.status(200).json({
        message: "Mock data fetched successfully",
        particularCityMockWeather,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Some error occured",
      message: error.message,
    });
  }
};
