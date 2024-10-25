const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bengaluru",
  "Kolkata",
  "Hyderabad",
];

const randomWeatherCondition = () => {
  const conditions = ["Clear", "Rain", "Clouds", "Haze", "Mist"];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const generateMockWeatherData = (city) => {
  let weatherData = [];

  for (let day = 1; day <= 7; day++) {
    for (let update = 1; update <= 4; update++) {
      const temp = Math.random() * (310 - 295) + 295;
      const weatherCondition = randomWeatherCondition();

      weatherData.push({
        city,
        temp,
        main: weatherCondition,
        timestamp: new Date(
          `2024-10-${day + 10}T${update * 6}:00:00`
        ).getTime(),
      });
    }
  }

  return weatherData;
};

// Generate data for all cities
export let allWeatherData = cities.flatMap((city) =>
  generateMockWeatherData(city)
);
