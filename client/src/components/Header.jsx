import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header className="sticky pb-10 top-0 text-white py-4 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center font-serif">{title}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
