import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../../config.js'

dotenv.config();

const {secret} = config;


const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({message: 'you need to login first'})
  }
  const user = jwt.verify(token, secret);
  req.user = user;
  next()
}

const deleteBlog = () => {}

export {auth}
