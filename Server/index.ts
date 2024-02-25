import express from 'express'
import bodyParser from 'body-parser'
import {
  createRandomDino,
  createImageFile,
  saveDinoToDB,
  aiGenerateName,
  generateEntireDino,
} from './src/functions'
import mongoose from 'mongoose'
import { BODY_1, EYES_1, HAT_1, HEAD_1, TAIL_1 } from './src/interface/bodyPart'
import { BodySet } from './src/interface/bodySet'

const mongoURI =
  'mongodb+srv://hacker24:z2r9eOUQyvFxnnYi@rowdyhacks24.1gnm4ij.mongodb.net/'

mongoose.connect(mongoURI)

const db = mongoose.connection

db.on('connected', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err)
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

const app = express()
app.use(bodyParser.json())

app.get('/new-dino', (req, res) => {})

generateEntireDino()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
