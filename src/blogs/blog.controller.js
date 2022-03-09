import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secrete = process.env.JWT_SECRET;

let blogs = [];

const createBlog = (req, res) => {
  const blog = req.body;
  if (req.user.role != 'admin') {
    return res.status(401).json({message: `you should be logged in as admin`})
  } else {
    blog.author = user.name;
    blogs.push(blog);
    res.status(201).json({message: 'blog added', blog})
  }
}

const deleteBlog = () => {}

export {createBlog}
