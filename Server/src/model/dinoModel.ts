import mongoose, { Schema, Document, model } from 'mongoose'

export const dinoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bodySet: {
    type: Object,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
  moves: {
    type: Array,
    required: true,
  },
})

const DinoModel = mongoose.model('Dino', dinoSchema)

export default DinoModel
