import express from "express";
import { fetchWeatherData } from "../controllers/weatherController.js";
const router = express.Router();

router.get("/fetch", fetchWeatherData);

export default router;
