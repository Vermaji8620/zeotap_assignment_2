import { GraphIterator } from "./Graph";
import WeatherSlide from "./WeatherSlide";
import PropTypes from "prop-types";

const WeatherSlider = ({ weatherData = null, mockWeatherData = null }) => {
  return (
    <>
      <div>
        {weatherData ? (
          <WeatherSlide cityData={weatherData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="">
        <h1 className="text-center text-3xl font-bold">
          Comparison for daily weather data for city
        </h1>
        <div>
          {mockWeatherData ? (
            <div>
              <GraphIterator
                city={mockWeatherData.city}
                data={mockWeatherData.data}
              />
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

WeatherSlider.propTypes = {
  weatherData: PropTypes.any.isRequired,
  mockWeatherData: PropTypes.any.isRequired,
};

export default WeatherSlider;
