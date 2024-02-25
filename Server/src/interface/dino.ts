import { ObjectId } from 'mongodb'
import { BodySet } from './bodySet'
import { Color } from './color'

export interface Dino {
  _id: ObjectId
  name: string
  bodySet: BodySet
  color: Color
  moves: Object[]
}
