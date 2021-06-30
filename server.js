const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bugService = require('./services/bug-service')
const userService = require('./services/user-service')
// const userServiceCopy = require('./services/user-service-copy.js')
const app = express()
const port = 3000

// Express App Configuration
// Ask Express.js to serve static files from the 'public' folder
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.use(session({
  secret: 'some secret token',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Authentication
app.post('/api/user/login', (req, res) => {
  const { credentials } = req.body
  userService.checkLogin(credentials)
    .then(user => {
      if (user) {
        console.log(user);
        // req.session.loggedinAt = Date.now();
        req.session.loggedinUser = user;
        res.json(user);
      } else {
        res.status(401).send('Please login')
      }
    })
})

app.post('/api/user/logout', (req, res) => {
  req.session.destroy()
  res.end('Cleared from session');
})

app.post('/api/user/signup', (req, res) => {
  const credentials = req.body
  userServiceCopy.save(credentials)
    .then(users => res.json(users))
})


// Get Bugs list
app.get('/api/bug', (req, res) => {
  // const { nickname } = req.cookies
  // if (!nickname) return res.status(401).send('Please login')
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
  const { loggedinUser } = req.session
  if (!loggedinUser) res.status(401).send('Please login')
  const { title, description, severity, createdAt } = req.body
  const bug = {
    title,
    description,
    severity,
    createdAt,
    creator: loggedinUser
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

