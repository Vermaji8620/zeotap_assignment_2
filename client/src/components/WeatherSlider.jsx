import WeatherSlide from "./WeatherSlide";
import PropTypes from "prop-types";

const WeatherSlider = ({ weatherData }) => {
  return (
    <div className="">
      {weatherData.eachcityarray ? (
        weatherData.eachcityarray.map((cityData, index) => (
          <WeatherSlide key={index} cityData={cityData} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

WeatherSlider.propTypes = {
  weatherData: PropTypes.any.isRequired,
};

export default WeatherSlider;
