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

// Get Bugs list
app.get('/api/bugs', (res, req) => {
  bugService.query()
    .then(bugs => res.send(bugs))
})

// Get Single bug
app.get('/api/bugs/:bugId', (res, req) => {
  const { bugId } = req.params
  bugService.getById(bugId)
    .then(bug => res.send(bug))
})

// Create bug
app.post('/api/bugs', (res, req) => {
  const { _id, title, description, severity, createdAt, creaotr } = req.body
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
      console.log('savedBug', savedBug)
      res.send(savedBug)
    })
})

// Edit bug
app.put('/api/bug', (res, req) => {
  const { _id, title, description, severity, createdAt, creaotr } = req.body
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
      console.log('savedBug', savedBug)
      res.send(savedBug)
    })
})

// Remove bug //TODO - add cookie "nickname"
app.delete('/api/bug:bugId', (res, req) => {
  const { bugId } = req.params
  bugService.remove(bugId)
    .then(() => {
      res.send('Deleted!')
    })


  app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
  })
})

