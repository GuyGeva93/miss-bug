
const fs = require('fs')
const gBugs = require('../data/bug.json')


module.exports = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return Promise.resolve(gBugs)
}

function getById(bugId) {
  const bug = gBugs.find(bug => bug._id === bugId)
  return Promise.resolve(bug)
}

function remove(bugId) {
  const idx = gBugs.findIndex(bug => bug._id === bugId)
  gBugs.splice(idx, 1)
  return _saveToFile()
}

function save(bugToSave) {
  const { title, description, severity, createdAt, creator } = bugToSave
  const bug = {
    _id: bugToSave._id || _makeId(),
    title,
    description,
    severity,
    createdAt,
    creator
  }
  if (bugToSave._id) {
    const idx = gBugs.findIndex(bug => bug._id === bugToSave._id)
    gBugs[idx] = bug
  }
  else {
    gBugs.unshift(bug)
  }
  return _saveToFile()
    .then(() => {
      return bug
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
    fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
      if (err) return reject(err)
      resolve();
    })
  })
}