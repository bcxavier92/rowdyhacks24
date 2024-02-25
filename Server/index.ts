import express from 'express'
import bodyParser from 'body-parser'
import {
  createImageFile,
  saveDinoToDB,
  aiGenerateName,
  generateEntireDino,
  attemptDinoGeneration,
} from './src/functions'
import mongoose from 'mongoose'
import { BODY_1, EYES_1, HAT_1, HEAD_1, TAIL_1 } from './src/interface/bodyPart'
import { BodySet } from './src/interface/bodySet'
import path from 'path'
import { existsSync } from 'fs'
import DinoModel from './src/model/dinoModel'
import CaughtModel from './src/model/caughtModel'

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

app.get('/collection', async (req, res) => {
  try {
    let caught = await CaughtModel.find({})

    let ids: any[] = []
    caught.forEach((elem) => {
      ids.push(elem.dinoId)
    })

    // @ts-ignore
    console.log(ids)
    let dinos = await DinoModel.find({ _id: { $in: ids } })
    console.log(dinos)
    let dinosArray = dinos.map((dino) => dino.toJSON())

    res.status(200).json({ collection: dinosArray })
  } catch (err) {
    res.status(500).json({ message: 'Could not perform task' })
    return
  }
})

app.post('/create-dino', async (req, res) => {
  const dino = await attemptDinoGeneration(10)

  if (dino) {
    res.status(201).json(dino.toJSON())
    return
  }

  res.status(500).json({ message: 'Could not create dino' })
  return
})

app.post('/catch', async (req, res) => {
  const { id } = req.body

  let dino
  try {
    dino = await DinoModel.findById(id)
  } catch (err) {
    res.status(500).json({ message: 'Could not get dino' })
    return
  }

  if (!dino) {
    res.status(404).json({ message: 'Dino does not exist' })
    return
  }

  const caught = new CaughtModel({
    dinoId: dino._id,
  })

  try {
    await caught.save()
  } catch (err) {
    res.status(500).json({ message: 'Could not update db' })
    return
  }

  res.status(201).json({ message: 'success' })
  return
})

app.get('/dino', async (req, res) => {
  const id = req.query.id
  let dino
  try {
    dino = await DinoModel.findById(id)
  } catch (err) {
    res.status(500).json({ message: 'Could not get dino' })
    return
  }

  if (dino) {
    res.status(200).json(dino.toJSON())
    return
  }

  res.status(404).json({ message: 'Dino does not exist' })
  return
})

app.get('/dev/populate', async (req, res) => {
  for (let i = 0; i < 10; i++) {
    await attemptDinoGeneration(5)
  }
})

app.use(express.static('./assets/image/dinos'))
app.get('/image', (req, res) => {
  const id = req.query.id

  if (!id) {
    res.status(400).json({ message: 'Empty id' })
    return
  }

  // @ts-ignore
  if (!/^[a-f0-9]+$/i.test(id)) {
    res.status(400).json({ message: 'Invalid id' })
    return
  }

  const imagePath = path.join(__dirname, './assets/image/dinos/' + id + '.png')
  if (!existsSync(imagePath)) {
    res.status(400).json({ message: 'Image does not exist' })
    return
  }

  res.status(200).sendFile(imagePath)
  return
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
