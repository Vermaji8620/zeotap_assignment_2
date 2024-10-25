import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import PropTypes from "prop-types";

export const LineGraph = ({ cityData }) => {
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

export const PieGraph = ({ everycityData }) => {
  const graphData = [
    {
      name: "Average Temp",
      value: Math.round(everycityData.averageTemp - 273.15),
    },
    {
      name: "Max Temp",
      value: Math.round(everycityData.maxTemp - 273.15),
    },
    {
      name: "Min Temp",
      value: Math.round(everycityData.minTemp - 273.15),
    },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={graphData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

PieGraph.propTypes = {
  everycityData: PropTypes.any.isRequired,
};
LineGraph.propTypes = {
  cityData: PropTypes.any.isRequired,
};

// BarGraph.propTypes = {
//   everycityData: PropTypes.any.isRequired,
// };
