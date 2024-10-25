import { allWeatherData } from "./mockdatageneration.js";

// Function to calculate average temperature for a city's daily data
const calculateAverageTemp = (data) => {
  const totalTemp = data.reduce((sum, entry) => sum + entry.temp, 0);
  return totalTemp / data.length;
};

// Function to find max temperature
const findMaxTemp = (data) => Math.max(...data.map((entry) => entry.temp));

// Function to find min temperature
const findMinTemp = (data) => Math.min(...data.map((entry) => entry.temp));

// Function to find the dominant weather condition
const getDominantWeather = (data) => {
  const conditionCounts = data.reduce((counts, entry) => {
    counts[entry.main] = (counts[entry.main] || 0) + 1;
    return counts;
  }, {});

  return Object.keys(conditionCounts).reduce((a, b) =>
    conditionCounts[a] > conditionCounts[b] ? a : b
  );
};

// Group data by city and by day for summary calculations
const calculateDailySummaries = (data) => {
  const dailySummaries = {};

  data.forEach((entry) => {
    const timestamp = new Date(entry.timestamp);
    if (isNaN(timestamp)) {
      return;
    }

    const date = timestamp?.toISOString()?.split("T")[0]; // Extract date
    const city = entry.city;

    if (!dailySummaries[city]) dailySummaries[city] = {};
    if (!dailySummaries[city][date]) dailySummaries[city][date] = [];

    dailySummaries[city][date].push(entry);
  });

  const summaries = {};

  for (const city in dailySummaries) {
    summaries[city] = {};

    for (const date in dailySummaries[city]) {
      const dayData = dailySummaries[city][date];
      summaries[city][date] = {
        averageTemp: calculateAverageTemp(dayData),
        maxTemp: findMaxTemp(dayData),
        minTemp: findMinTemp(dayData),
        dominantWeather: getDominantWeather(dayData),
      };
    }
  }

  return summaries;
};

const transformDailySummaries = (dailySummaries) => {
  const transformedData = [];

  for (const city in dailySummaries) {
    for (const date in dailySummaries[city]) {
      transformedData.push({
        city,
        date,
        averageTemp: dailySummaries[city][date].averageTemp,
        maxTemp: dailySummaries[city][date].maxTemp,
        minTemp: dailySummaries[city][date].minTemp,
        dominantWeather: dailySummaries[city][date].dominantWeather,
      });
    }
  }

  return transformedData;
};
export const transformedData = transformDailySummaries(
  calculateDailySummaries(allWeatherData)
);
console.log(transformedData);
