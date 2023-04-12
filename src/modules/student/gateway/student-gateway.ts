import Student from '../entity/student-entity'

export default interface StudentGateway {
  add(student: Student): Promise<void>
}
