import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema(
  {
    weatherData: [
      {
        weather: Array,
        main: Object,
        wind: Object,
        name: String,
        id: Number,
        dt: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const WeatherData = mongoose.model("WeatherData", weatherDataSchema);
