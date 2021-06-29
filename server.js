const express = required('express')
const coockieParser = required('coockie-parser')

const bugService = required('./services/bug-service')
const app = express()
const port = 3000

// Express App Configuration
// Ask Express.js to serve static files from the 'public' folder
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// get Bugs list
app.get('/api/bugs', (res, req) => {
  bugService.query()
    .then(bugs => res.send(bugs))
})

// get Single bug
app.get('/api/bugs/:bugId', (res, req) => {
  const { bugId } = req.params
  bugService.getById(bugId)
    .then(bug => res.send(bug))
})

