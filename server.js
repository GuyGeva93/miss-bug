const express = require('express')
const cookieParser = require('cookie-parser')

const bugService = require('./services/bug-service.js')
const app = express()
const port = 3000

// Express App Configuration
// Ask Express.js to serve static files from the 'public' folder
// app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// Get Bugs list
app.get('/api/bug', (req, res) => {
  bugService.query()
    .then(bugs => res.send(bugs))
})

// Get Single bug
app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  bugService.getById(bugId)
    .then(bug => res.send(bug))
})

// Create bug
app.post('/api/bug', (req, res) => {
  const { title, description, severity, createdAt, creator } = req.body
  const bug = {
    title,
    description,
    severity,
    createdAt,
    creator
  }
  bugService.save(bug)
    .then(savedBug => {
      console.log('savedBug', savedBug)
      res.send(savedBug)
    })
})

// Edit bug
app.put('/api/bug', (req, res) => {
  const { _id, title, description, severity, createdAt, creator } = req.body
  const bug = {
    _id,
    title,
    description,
    severity,
    createdAt,
    creator
  }
  bugService.save(bug)
    .then(savedBug => {
      res.send(savedBug)
    })
})

// Remove bug //TODO - add cookie "nickname"
app.delete('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  console.log('bugId', bugId)
  bugService.remove(bugId)
    .then(() => {
      res.send('Deleted!')
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`)
})

