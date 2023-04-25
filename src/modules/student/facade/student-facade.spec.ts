import { connectDb, dropCollections, dropDb } from '../../../_shared/utils/db/mongodb-memory-server'
import Student from '../entity/student-entity'
import StudentFacadeFactory from '../factories/student-facade-factory'
import { StudentModel } from '../repository/student-model'

const fakeStudent = new Student({
  name: 'any_name',
  email: 'any_email@mail.com',
  phone: '+244939781000'
})

type sutTypes = {
  add: any
  find: any
}

const makeSut = (): sutTypes => {
  return StudentFacadeFactory.create()
}

describe('StudentFacade test', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should be able to create a new Student ', async () => {
    const studentFacade = makeSut()

    const input = {
      name: 'valid_name',
      phone: '+244 900000000',
      email: 'valid_email@mail.com'
    }

    const response = await studentFacade.add(input)
    expect(response.body.id).toBeTruthy()
    expect(response.body.name).toBe(input.name)
    expect(response.body.phone).toBe(input.phone)
    expect(response.body.email).toBe(input.email)
  })

  test('Should be able to find a Student', async () => {
    const studentFacade = makeSut()

    await StudentModel.create({
      id: fakeStudent.id,
      name: fakeStudent.name,
      email: fakeStudent.email,
      phone: fakeStudent.phone,
      createdAt: fakeStudent.createdAt,
      updatedAt: fakeStudent.updatedAt
    })

    const input = {
      filter: {
        id: fakeStudent.id.id
      }
    }

    const response = await studentFacade.find(input)

    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(fakeStudent.name)
    expect(response.body.email).toBe(fakeStudent.email)
    expect(response.body.phone).toBe(fakeStudent.phone)
    expect(response.body.createdAt).toEqual(fakeStudent.createdAt)
    expect(response.body.updatedAt).toEqual(fakeStudent.updatedAt)
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
