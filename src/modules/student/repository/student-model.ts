import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
  id: String,
  name: String,
  phone: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
})

export const StudentModel = mongoose.model('students', studentSchema)
