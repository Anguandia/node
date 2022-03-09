import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secrete = process.env.JWT_SECRET;


const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({message: 'you need to login first'})
  }
  const user = jwt.verify(token, secrete);
  req.user = user;
  next()
}

const deleteBlog = () => {}

export {auth}
