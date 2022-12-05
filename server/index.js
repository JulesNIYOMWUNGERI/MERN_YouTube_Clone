import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import videoRouter from './routes/videoRouter.js';
import userRouter from './routes/userRouter.js';
import commentRouter from './routes/commentRouter.js';




const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/videos',videoRouter);
app.use('/comment',commentRouter);



const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server is running on port:http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));









//zF08tdL52y3lKQgt