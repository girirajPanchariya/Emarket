import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './others/Database.js';
import { UserRouter } from './Router/UserRotuer.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://peppy-chimera-e13188.netlify.app"
    ];

    // allow requests with no origin (Postman, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(cookieParser())
app.use('/user', UserRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  DBConnection()
})