import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import postRoute from './routes/postRoute.js';
import commentRoute from './routes/commentRoute.js';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connection Successful");
})
.catch((err) => console.log(err));



app.listen(3000, () => {
    console.log("Server started at port 3000");
})


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post',postRoute);
app.use('/api/comment', commentRoute);

app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});