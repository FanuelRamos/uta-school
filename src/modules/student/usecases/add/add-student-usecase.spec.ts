import Id from '../../../_shared/domain/value-object/id-value-object'
import StudentGateway from '../../gateway/student-gateway'
import AddStudentUseCase from './add-student-usecase'
import { AddStudentUseCaseInputDTO, AddStudentUseCaseOutputDTO } from './add-student-usecase-dto'

const makeFakeRequest: AddStudentUseCaseInputDTO = {
  name: 'valid_name',
  phone: '+244 900000000',
  email: 'valid_email@mail.com'
}

const makeFakeStudent: AddStudentUseCaseOutputDTO = {
  id: new Id().id,
  name: 'valid_name',
  phone: '+244 900000000',
  email: 'valid_email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

const MockRepository = (): StudentGateway => {
  return {
    add: jest.fn().mockReturnValue(Promise.resolve(makeFakeStudent)),
    find: jest.fn()
  }
}

type SutType = {
  repository: StudentGateway
  sut: AddStudentUseCase
}

const makeSut = (): SutType => {
  const repository = MockRepository()
  const sut = new AddStudentUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('AddStudentUseCase test', () => {
  test('Should be able to add a Student', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeFakeRequest)
    expect(response).toBeTruthy()
    expect(response).toBeTruthy()
  })
})
