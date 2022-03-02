import express from 'express';
import userRouter from './users/routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(3000, () => console.log('server running'));