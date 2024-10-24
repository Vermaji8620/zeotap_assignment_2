import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
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
