// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './Router/UserRotuer.js';
import DBConnection from './others/Database.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// ===== CORS Setup =====
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://astounding-buttercream-c306f0.netlify.app" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // important for cookies
}));

// ===== Routes =====
app.use('/user', UserRouter);

// ===== Start Server & Connect DB =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await DBConnection();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
});
