import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import coachRoute from "./routes/coach.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/coach", coachRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "FootGPT",
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));