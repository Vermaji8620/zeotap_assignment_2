import { GraphIterator } from "./Graph";
import WeatherSlide from "./WeatherSlide";
import PropTypes from "prop-types";

const WeatherSlider = ({ weatherData, mockWeatherData }) => {
  return (
    <>
      <div>
        {weatherData.eachcityarray ? (
          weatherData.eachcityarray.map((cityData, index) => (
            <WeatherSlide key={index} cityData={cityData} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="">
        <h1 className="text-center text-3xl font-bold">
          Comparison for daily weather data for city
        </h1>
        <div>
          {mockWeatherData.transformDatareceived ? (
            <div>
              {mockWeatherData.transformDatareceived.map(
                (everycityData, index) => (
                  <GraphIterator
                    key={index}
                    city={everycityData.city}
                    data={everycityData.data}
                  />
                )
              )}
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
