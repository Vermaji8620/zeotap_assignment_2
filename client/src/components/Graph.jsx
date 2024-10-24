import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const Graph = ({ cityData }) => {
  const graphData = [
    { name: "Temp", value: Math.round(cityData.main.temp - 273.15) },
    {
      name: "Feels Like",
      value: Math.round(cityData.main.feels_like - 273.15),
    },
    { name: "Humidity", value: cityData.main.humidity },
    { name: "Wind Speed", value: cityData.wind.speed },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#10EBFBFF" />
      </LineChart>
    </ResponsiveContainer>
  );
};

Graph.propTypes = {
  cityData: PropTypes.any.isRequired,
};

export default Graph;
