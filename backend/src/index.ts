import express from 'express'

const ideas = [
  { id: 'ideanick1', name: 'Idea1', description: 'Description idea1 ...' },
  { id: 'ideanick2', name: 'Idea2', description: 'Description idea2 ...' },
  { id: 'ideanick3', name: 'Idea3', description: 'Description idea3 ...' },
  { id: 'ideanick4', name: 'Idea4', description: 'Description idea4 ...' },
  { id: 'ideanick5', name: 'Idea5', description: 'Description idea5 ...' },
]
const expressApp = express()

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})
expressApp.get('/ideas', (req, res) => {
  res.send(ideas)
})
expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
