import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema(
  {
    city: String,
    main: String,
    temp: Number,
    feels_like: Number,
    dt: Number,
  },
  {
    timestamps: true,
  }
);

export const WeatherData = mongoose.model("WeatherData", weatherDataSchema);
