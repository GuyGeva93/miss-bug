
const fs = require('fs')
const gUsers = require('../data/user.json')


module.exports = {
  getById,
  remove,
  save,
  checkLogin
}

function checkLogin(credentials) {
  var user = gUsers.find(user => user.username === credentials.username && user.password === credentials.password)
  if (user) {
    user = { ...user }
    delete user.password
  }
  return Promise.resolve(user)
}

function getById(userId) {
  const user = gUsers.find(user => user._id === userId)
  return Promise.resolve(user)
}

function remove(userId) {
  const idx = gUsers.findIndex(user => user._id === userId)
  if (idx < 0) return Promise.reject(`Didn't find index`)
  gUsers.splice(idx, 1)
  return _saveToFile()
}

function save(userToSave) {
  // const { title, description, severity, createdAt, creator } = userToSave
  const user = {
    _id: userToSave._id || _makeId(),
    username: userToSave.username,
    password: userToSave.password,
    // createdAt,
    // creator
  }
  if (userToSave._id) {
    const idx = gUsers.findIndex(user => user._id === userToSave._id)
    gUsers.splice(idx, 1, user)
  }
  else {
    gUsers.unshift(user)
  }
  return _saveToFile()
    .then(() => {
      delete user.password
      return user
    })
}

function _makeId(length = 5) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
      if (err) return reject(err)
      resolve();
    })
  })
}