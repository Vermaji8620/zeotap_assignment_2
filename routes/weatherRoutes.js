import express from "express";
import {
  fetchMockData,
  fetchWeatherData,
} from "../controllers/weatherController.js";
const router = express.Router();

router.get("/fetch", fetchWeatherData);
router.get("/fetchmockdata", fetchMockData);

export default router;
