import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {appendFile, createReadStream} from 'fs';
import readLine from 'readline';
import config from '../../../config.js';


const users = [];

const {secret, db} = config

const fetchUsers = () => {
  let lineNo = 0;
  const source = readLine.createInterface({input: createReadStream(db)});
  source.on('line', (line) => {
    if(lineNo>= users.length) users.push(JSON.parse(line));
    lineNo++
  })
}

fetchUsers();

const homepage = (req, res) => res.json({message: 'request recieved'});

const getUsers = (req, res) => res.json({message: `all ${users.length} users retrieved`, users});

const addUser = (req, res) => {
  let responseObject, status;
  const user = req.body;
  user.id = users.length;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) {
      console.log(err);
      status = 500;
      responseObject = {error: 'Internal error'}
    } else {
      user.password = hash;
      // users.push(user);
      const data = `${JSON.stringify(user)}\n`;
      appendFile(db, data, (err) => {
        if (err) console.log(err);
        else {
          fetchUsers();
        }
      })
      const token = jwt.sign(user, secret, {expiresIn: 60*5});
      status = 201
      responseObject = {message: `user ${user.name} successfully registered`, user, token}
    }
    res.status(status).json(responseObject);
  })
}

const login = (req, res) => {
  let responseObject, status;
  const data = req.body;
  const user = users.find(user => user.email == data.email);
  if(!user) return res.status(400).json({error: 'invalid email **** or password'})
  bcrypt.compare(data.password, user.password, (err, verified) => {
    if(err) {
      responseObject = {error: 'internal error'};
      status = 500;
    }
    if(verified) {
      const token = jwt.sign(user, secret, {expiresIn: 60*5});
      const {passsword, ...rest} = user;
      responseObject = {message: `welcome ${user.name}`, user: rest, token};
      const decoded = jwt.verify(token, secret);
      status = 200;
    } else {
      responseObject = {error: 'invalid email or password'};
      status = 400;
    }
    res.status(status).json(responseObject);
  })
}

const getUser = (req, res) => {
  const user = req.body;
  user.id = users.length;
  users.push(user);
  res.json({message: `user ${user.name} successfully created`, user});
}

const updateUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((e) => e.id == id);
  const update = req.body;
  Object.assign(user, update);
  res.json({message: `user with id ${id} successfully updated`, user: user})
}

const deleteUser = (req, res) => {
  const {id} = req.params;
  users.splice(id, 1);
  res.json({message: `user with id ${id} successfully deleted`});
}

export {homepage, getUsers, getUser, updateUser, addUser, deleteUser, login, users}