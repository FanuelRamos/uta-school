import { FilterQuery } from 'mongoose'
import Student from '../entity/student-entity'

export default interface StudentGateway {
  add(student: Student): Promise<void>
  find(filter: FilterQuery<unknown>): Promise<Student | null>
}
