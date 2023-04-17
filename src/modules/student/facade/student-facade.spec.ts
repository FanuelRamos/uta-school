import { connectDb, dropCollections, dropDb } from '../../_shared/utils/db/mongodb-memory-server'
import StudentFacadeFactory from '../factories/student-facade-factory'

describe('StudentFacade test', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should be able to create a new Student ', async () => {
    const studentFacade = StudentFacadeFactory.create()

    const input = {
      name: 'valid_name',
      phone: '+244 900000000',
      email: 'valid_email@mail.com'
    }

    const response = await studentFacade.add(input)
    expect(response).toBeTruthy()
    expect(response.body.id).toBeTruthy()
    expect(response.body.name).toBe(input.name)
    expect(response.body.phone).toBe(input.phone)
    expect(response.body.email).toBe(input.email)
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
