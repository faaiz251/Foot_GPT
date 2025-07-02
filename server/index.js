import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";

import authRoutes from "./routes/auth/auth.js";
import userRoutes from "./routes/me/userRoutes.js";
import dashRoutes from "./routes/dash/dash.js";
import { authenticateUser } from "./routes/middleware/authmiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://foot-gpt.vercel.app/', // or your frontend production URL
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user" , authenticateUser , dashRoutes );

cron.schedule('0 * * * *', () => {
  console.log('Running cron job at every hour at minute 0!');
  // Example: call a function to update database, clear cache, etc.
});

app.get('/', (req, res) => {
  res.status(200).send("Hi to cron job from server");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Foot_GPT",
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));