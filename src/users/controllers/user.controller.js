const users = [];
const homepage = (req, res) => res.json({message: 'request recieved'});

const getUsers = (req, res) => res.json({message: 'all users retrieved', users});

const addUser = (req, res) => {
  const user = req.body;
  user.id = users.length;
  users.push(user);
  res.json({message: `user ${user.name} successfully created`, user});
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

export {homepage, getUsers, getUser, updateUser, addUser, deleteUser, users}