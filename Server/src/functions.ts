import sharp from 'sharp'
import { BODY_1, EYES_1, HAT_1, HEAD_1, TAIL_1 } from './interface/bodyPart'
import { BodySet } from './interface/bodySet'
import { Dino } from './interface/dino'
import path from 'path'
import { Color } from './interface/color'
import DinoModel from './model/dinoModel'
import 'dotenv/config'

const { CF_API_KEY } = process.env

export const createRandomDino = (): Dino => {
  const bodySet: BodySet = {
    head: HEAD_1,
    body: BODY_1,
    tail: TAIL_1,
    eyes: EYES_1,
    hat: HAT_1,
  }

  const dino: Dino = {
    id: 'ahdohuwhdao9wdada0soid',
    name: 'spinosaurus',
    bodySet: bodySet,
    color: { r: 100, g: 100, b: 100 },
  }

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

  console.log('Image paths')
  console.log(remainingImagePaths)

  try {
    // @ts-ignore
    baseImage.composite(remainingImagePaths).toFile('test-output.png')
  } catch (error) {
    console.error(error)
  }
}

export const saveDinoToDB = (name: String, bodySet: BodySet, color: Color) => {
  const newDino = new DinoModel({
    name,
    bodySet,
    color,
  })

  newDino.save()
}

export const generateEntireDino = async () => {
  const words = (await getRandomWords(60)).split(', ')
  const seed1 = words.slice(0, 15).toString()
  const seed2 = words.slice(15, 30).toString()
  const seed3 = words.slice(30, 45).toString()
  const seed4 = words.slice(45, 60).toString()

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
  //   const strMove2 = aiResponseToJson((await aiGenerateMove(seed3)).result)
  //   const strMove3 = aiResponseToJson((await aiGenerateMove(seed4)).result)

  console.log(
    strName + ' / ' + strName.indexOf('{') + ' / ' + strName.indexOf('}')
  )
  console.log(
    strMoves + ' / ' + strMoves.indexOf('{') + ' / ' + strName.indexOf('}')
  )
  //   console.log(strMove2)
  //   console.log(strMove3)
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

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.join(', ')
  } catch (error) {
    console.error('Error:', error)
    return 'An error occurred'
  }
}
