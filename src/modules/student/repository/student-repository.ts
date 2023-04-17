import { FilterQuery } from 'mongoose'
import Student from '../entity/student-entity'
import StudentGateway from '../gateway/student-gateway'
import { StudentModel } from './student-model'
import Id from '../../_shared/domain/value-object/id-value-object'

export default class StudentRepository implements StudentGateway {
  async add (student: Student): Promise<void> {
    await StudentModel.create({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<Student> {
    const student = await StudentModel.findOne(filter)
    if (!student) {
      return null
    }

    return new Student({
      id: new Id(student.id),
      name: student.name!,
      email: student.email!,
      phone: student.phone!,
      createdAt: student.createdAt!,
      updatedAt: student.updatedAt!
    })
  }
}
