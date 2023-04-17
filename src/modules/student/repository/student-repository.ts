import { FilterQuery } from 'mongoose'
import StudentEntity from '../entity/student-entity'
import StudentGateway from '../gateway/student-gateway'
import { StudentModel } from './student-model'

export default class StudentRepository implements StudentGateway {
  async add (student: StudentEntity): Promise<void> {
    await StudentModel.create({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<StudentEntity> {
    throw new Error('Method not implemented.')
  }
}
