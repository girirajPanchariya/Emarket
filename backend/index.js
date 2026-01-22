import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBConnection from "./others/Database.js";
import { UserRouter } from "./Router/UserRotuer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ----------------- MIDDLEWARE -----------------

// 1️⃣ CORS: allow local + Netlify frontend, with credentials
app.use(
  cors({
    origin: [
      "http://localhost:5173",                        // local dev
      "https://peppy-chimera-e13188.netlify.app",
      "https://stellar-choux-ad9271.netlify.app"    // your Netlify frontend
    ],
    credentials: true, // allow cookies
  })
);

// 2️⃣ Parse JSON body
app.use(express.json());

// 3️⃣ Parse cookies
app.use(cookieParser());

// ----------------- ROUTES -----------------
app.use("/user", UserRouter);

// ----------------- GLOBAL ERROR HANDLER -----------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  DBConnection(); // connect to database
});
