import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './others/Database.js';
import { UserRouter } from './Router/UserRotuer.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://lucent-otter-29fb54.netlify.app"
  ],
  credentials: true
}));

app.use(cookieParser())
app.use('/user', UserRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  DBConnection()
})