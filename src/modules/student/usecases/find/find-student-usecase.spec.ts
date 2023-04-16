import Id from '../../../_shared/domain/value-object/id-value-object'
import StudentGateway from '../../gateway/student-gateway'
import FindStudentUseCase from './find-student-usecase'

const input = {
  filter: {
    id: new Id().id
  }
}

const makeFakeStudent = {
  id: new Id().id,
  name: 'valid_name',
  phone: '+244 900000000',
  email: 'valid_email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

const MockRepository = (): StudentGateway => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(makeFakeStudent))
  }
}

type SutType = {
  repository: StudentGateway
  sut: FindStudentUseCase
}

const makeSut = (): SutType => {
  const repository = MockRepository()
  const sut = new FindStudentUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('FindStudentUseCase Tests', () => {
  test('Should be able to find a Student', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(input)

    expect(response).toBeTruthy()
    expect(response.body.id).toBe(makeFakeStudent.id)
    expect(response.body.name).toBe(makeFakeStudent.name)
    expect(response.body.phone).toBe(makeFakeStudent.phone)
    expect(response.body.email).toBe(makeFakeStudent.email)
  })
})
