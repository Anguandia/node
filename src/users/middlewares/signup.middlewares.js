import {users} from '../controllers/user.controller.js'
const signupValidator = (req, res, next) => {
  let {email, name} = req.body
  if(!email) return res.json({error: 'email missing'});
  if(!name) return res.json({error: 'name missing'});
  if(!email.includes('@')) return res.json({error: 'invalid email'})
  if(users.find((u) => u.email == email)) return res.status(409).json({message: `user with email ${email} exists`})
  next();
}

export {signupValidator as default}