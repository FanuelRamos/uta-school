import { connectDb, dropCollections, dropDb } from '../../_shared/utils/db/mongodb-memory-server'
import Student from '../entity/student-entity'
import StudentGateway from '../gateway/student-gateway'
import { StudentModel } from './student-model'
import StudentRepository from './student-repository'

const fakeStudent = new Student({
  name: 'any_name',
  email: 'any_email@mail.com',
  phone: '+244939781000'
})

const makeSut = (): StudentGateway => {
  return new StudentRepository()
}

describe('StudentRepository Tests', () => {
  beforeEach(async () => {
    await connectDb()
  })

  test('Should add a Student', async () => {
    const studentRepository = makeSut()

    await studentRepository.add(fakeStudent)

    const result = await StudentModel.findOne({ id: fakeStudent.id.id })
    expect(result).toBeTruthy()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(fakeStudent.name)
    expect(result.email).toBe(fakeStudent.email)
    expect(result.phone).toBe(fakeStudent.phone)
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
