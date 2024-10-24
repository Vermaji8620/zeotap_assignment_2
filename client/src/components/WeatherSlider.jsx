import Slider from "react-slick";
import WeatherSlide from "./WeatherSlide";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherSlider = ({ weatherData }) => {
  // const settings = {
  // dots: true,
  // infinite: true,
  // speed: 500,
  // slidesToShow: 1,
  // slidesToScroll: 1,
  // };

  return (
    <div className="" >
      {/* <Slider> */}
      {weatherData.eachcityarray ? (
        weatherData.eachcityarray.map((cityData, index) => (
          <WeatherSlide key={index} cityData={cityData} />
        ))
      ) : (
        <p>Loading...</p>
      )}
      {/* </Slider> */}
    </div>
  );
};

WeatherSlider.propTypes = {
  weatherData: PropTypes.any.isRequired,
};

export default WeatherSlider;
