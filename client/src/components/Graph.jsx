import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
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
export const GraphIterator = ({ city, data }) => {
  return (
    <div className="mb-16 flex flex-col gap-10">
      <div className="text-yellow-400 flex flex-col gap-10">
        {city}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {data &&
            data.map((everyDataItem, index) => (
              <div className="flex-shrink-0" key={index}>
                <BarGraph city={city} everyDataItem={everyDataItem} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const BarGraph = ({ everyDataItem }) => {
  const graphData = [
    {
      name: "Max Temp",
      value: Math.round(everyDataItem.maxTemp - 273.15),
    },
    {
      name: "Min Temp",
      value: Math.round(everyDataItem.minTemp - 273.15),
    },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <ResponsiveContainer width={300} height={300}>
      <BarChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
      <p className="text-center">{everyDataItem.date}</p>
    </ResponsiveContainer>
  );
};

GraphIterator.propTypes = {
  city: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
};
BarGraph.propTypes = {
  everyDataItem: PropTypes.any.isRequired,
};
LineGraph.propTypes = {
  cityData: PropTypes.any.isRequired,
};
