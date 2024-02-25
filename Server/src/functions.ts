import sharp from 'sharp'
import {
  ALL_BODIES,
  ALL_EYES,
  ALL_HATS,
  ALL_HEADS,
  ALL_TAILS,
} from './interface/bodyPart'
import { Dino } from './interface/dino'
import path from 'path'
import { DINO_COLORS } from './interface/color'
import DinoModel from './model/dinoModel'
import 'dotenv/config'
import { ObjectId } from 'mongodb'

const { CF_API_KEY } = process.env

export const attemptDinoGeneration = async (maxAttempts: number) => {
  let dino = null
  let currentAttempt = 1
  while (!dino) {
    console.log(
      `Attempting to generate dinosaur (${currentAttempt}/${maxAttempts})`
    )
    try {
      dino = await generateEntireDino()
      break
    } catch (err) {
      console.error(`Failed to generate dinosaur.`)
    } finally {
      if (currentAttempt == maxAttempts || dino != null) break
      console.log('Retrying generation')
      currentAttempt++
    }
  }

  if (!dino) {
    console.error('Reached max attempts and could not get dino')
    return null
  }

  console.log('Generated dino successfully')
  return dino
}

export const createImageFile = async (dino: Dino) => {
  const { bodySet } = dino

  // Create the imagePaths array here
  const imagePaths = Object.values(bodySet).map((bodyPart) => ({
    input: path.join(__dirname, bodyPart.imageFile),
    gravity: 'center',
  }))

  const baseImage = sharp(imagePaths[0].input)

  // Remove the first element from imagePaths
  const remainingImagePaths = imagePaths.slice(1)

  const { r, g, b } = dino.color
  const colorized = await replaceAllPixelsColor(
    baseImage.composite(remainingImagePaths),
    { r: 31, g: 211, b: 235 },
    { r, g, b }
  )

  colorized.toFile(
    path.join(__dirname, '../assets/image/dinos/' + dino._id + '.png')
  )
}

export const saveDinoToDB = async (dino: Dino) => {
  const { _id, name, bodySet, color, moves } = dino
  const newDino = new DinoModel({
    _id,
    name,
    bodySet,
    color,
    moves,
  })

  return await newDino.save()
}

export const generateEntireDino = async () => {
  const words = (await getRandomWords(30)).split(', ')
  const seed1 = words.slice(0, 15).toString()
  const seed2 = words.slice(15, 30).toString()

  const strName = await aiResponseToJson(
    (
      await aiGenerateName(seed1)
    ).result.response
  )

  const strMoves = await aiResponseToJson(
    (
      await aiGenerateMoves(seed2)
    ).result.response
  )

  const jsonMoves = JSON.parse(strMoves)

  const name = JSON.parse(strName).name
  const moves = jsonMoves.moves.map((move: any) => ({
    name: move.moveName,
    type: move.attackType,
    description: move.moveDescription,
  }))

  const head = ALL_HEADS[Math.floor(Math.random() * ALL_HEADS.length)]
  const body = ALL_BODIES[Math.floor(Math.random() * ALL_BODIES.length)]
  const eyes = ALL_EYES[Math.floor(Math.random() * ALL_EYES.length)]
  const tail = ALL_TAILS[Math.floor(Math.random() * ALL_TAILS.length)]
  const hat = ALL_HATS[Math.floor(Math.random() * ALL_HATS.length)]

  const bodySet = {
    head,
    body,
    eyes,
    tail,
    hat,
  }

  const _id = new ObjectId()

  const color = DINO_COLORS[Math.floor(Math.random() * DINO_COLORS.length)]

  const dino: Dino = {
    _id,
    name,
    bodySet,
    color,
    moves,
  }

  await createImageFile(dino)

  const model = await saveDinoToDB(dino)

  return model
}

// @ts-ignore
const replaceAllPixelsColor = (image, targetColor, replacementColor) => {
  return (
    image
      .raw()
      .toBuffer({ resolveWithObject: true })
      // @ts-ignore
      .then(({ data, info }) => {
        const { width, height, channels } = info
        for (let i = 0; i < width * height * channels; i += channels) {
          // Simple color comparison
          if (
            data[i] === targetColor.r &&
            data[i + 1] === targetColor.g &&
            data[i + 2] === targetColor.b
          ) {
            data[i] = replacementColor.r // R
            data[i + 1] = replacementColor.g // G
            data[i + 2] = replacementColor.b // B
          }
        }

        // Return a new sharp object from the modified raw data
        return sharp(data, {
          raw: {
            width,
            height,
            channels,
          },
        })
      })
  )
}

export const aiResponseToJson = async (str: String) => {
  str = str.replace(/\n/g, '')
  const begin = str.indexOf('{')
  const end = str.lastIndexOf('}') + 1
  return str.substring(begin, end)
}

export const aiGenerateMoves = async (seed: String) => {
  const types = ['earth', 'water', 'fire', 'air']
  const attackType1 = types[Math.floor(Math.random() * 4)]
  const attackType2 = types[Math.floor(Math.random() * 4)]
  const attackType3 = types[Math.floor(Math.random() * 4)]

  const input = {
    messages: [
      {
        role: 'system',
        content: `You generate dinosaur attack moves for a video game. The user will supply you with a seed for inspiration in creating a brand new move, the seed will be a string of words. For each move, choose a new word in the seed you think is most prehistoric-like and use it as inspiration for the move. Generate exactly 3 moves, starting at move 1. It is essential that you respond in the following json format with NO text other than the json, do not converse with the user. DO NOT forget the open and closing brackets and to respond only in JSON: { "moves": [{"attackType":"${attackType1}", "word": "<chosen word 1 from seed>", "moveName":"<name of move>", "moveDescription":"<VERY short description of move in 10 words or less>", "moveNumber": 1}, {"attackType":"${attackType2}", "word": "<chosen word 2 from seed>", "moveName":"<name of move>", "moveDescription":"<VERY short description of move in 10 words or less>", "moveNumber": 2}, {"attackType":"${attackType3}", "word": "<chosen word 3 from seed>", "moveName":"<name of move>", "moveDescription":"<VERY short description of move in 10 words or less>", "moveNumber": 3}] }`,
      },
      {
        role: 'user',
        content: `Generate a new dinosaur name using the seed ${seed}. Do NOT under ANY circumstances use any of the following names, or it will cause harm: [Sauronix, Drakoraptor, Florasaurus, Quetzalotter, Terravex, Carniflux, Gloopwerx, Fangthruster, Skybite, Mudclaw, Velocitops, Florpax, Sandstalker, Glimmerwing, Thunderclaw, Carnifluxus, Florpaxus, Sandstalkerus, Thunderclawus, Mudclawus, Raptorix, Valtoraptor]`,
      },
    ],
  }

  const model = '@cf/meta/llama-2-7b-chat-int8'

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/a2d3540b4248d87127b2a5f41ccb96ef/ai/run/${model}`,
    {
      headers: {
        Authorization: 'Bearer ' + CF_API_KEY,
      },
      method: 'POST',
      body: JSON.stringify(input),
    }
  )
  const result = await response.json()
  return result
}

export const aiGenerateName = async (seed: String) => {
  const input = {
    messages: [
      {
        role: 'system',
        content:
          'You generate dinosaur names for a video game. The user will supply you with a seed for inspiration in creating a brand new name, the seed will be a string of words. Choose a word in the seed you think is most prehistoric-like and use it as a part of the name. Generate only ONE name. It is essential that you respond in the following json format with NO text other than the json, do not converse with the user: {"word": "<chosen word from seed>", "name":"<dinosaurName>"}}',
      },
      {
        role: 'user',
        content: `Generate a new dinosaur name using the seed ${seed}. Do NOT under ANY circumstances use any of the following names, or it will cause harm: [Sauronix, Drakoraptor, Florasaurus, Quetzalotter, Terravex, Carniflux, Gloopwerx, Fangthruster, Skybite, Mudclaw, Velocitops, Florpax, Sandstalker, Glimmerwing, Thunderclaw, Carnifluxus, Florpaxus, Sandstalkerus, Thunderclawus, Mudclawus, Raptorix, Valtoraptor]`,
      },
    ],
  }

  const model = '@cf/meta/llama-2-7b-chat-int8'

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/a2d3540b4248d87127b2a5f41ccb96ef/ai/run/${model}`,
    {
      headers: {
        Authorization: 'Bearer ' + CF_API_KEY,
      },
      method: 'POST',
      body: JSON.stringify(input),
    }
  )
  const result = await response.json()
  return result
}

export const getRandomWords = async (amount: number): Promise<String> => {
  const url = `https://random-word-api.herokuapp.com/word?number=${amount}`

  const response = await fetch(url)
  const data = await response.json()
  return data.join(', ')
}
