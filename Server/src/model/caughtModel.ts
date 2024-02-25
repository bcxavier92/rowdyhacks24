import { ObjectId } from 'mongodb'
import mongoose, { Schema, Document, model } from 'mongoose'

export const caughtSchema = new Schema({
  dinoId: {
    type: ObjectId,
    required: true,
    unique: true,
  },
})

const CaughtModel = mongoose.model('Caught', caughtSchema)

export default CaughtModel
