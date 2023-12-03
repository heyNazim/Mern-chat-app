import express from "express";
import cors from 'cors';
import color from 'colors';
import dotenv from 'dotenv';
import router from "./routes/userRoute.js";
import connectDb from "./config/Db.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// dtabase connection------------------------
connectDb();
// all routes-------------------------------
app.use('/api', router )


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`.bgWhite)
})



