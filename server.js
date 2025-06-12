import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";
import { mailing } from "./routes/mailingRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/weather", weatherRoutes);
app.post("/mail", mailing);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
