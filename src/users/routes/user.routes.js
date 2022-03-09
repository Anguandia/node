import express from 'express';
import {homepage, getUsers, getUser, updateUser, addUser, deleteUser, login} from '../controllers/user.controller.js';
import signup from '../middlewares/signup.middlewares.js';
import {createBlog} from '../../blogs/blog.controller.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get('/', homepage);

router.get('/users', getUsers);

router.post('/users', signup, addUser);

router.post('/login', login);

router.post('/blogs', auth, createBlog);

router.get('/users/:id', getUser);

router.patch('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export {router as default};