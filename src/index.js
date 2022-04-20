import express from 'express';
import userRouter from './users/routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(userRouter);
// make the app listen on a fixed port
app.listen(3000, () => console.log('server running'));