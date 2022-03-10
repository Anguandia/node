import express from 'express';
import userRouter from './users/routes/user.routes.js';
import config from '../config.js';

const {port} = config;
const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log(`server running on port ${port}`));

export {app as default}