import express from 'express';
import userRouter from './users/routes/user.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log(`server running on port ${port}`));