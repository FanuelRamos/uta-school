import Id from '../../../_shared/domain/value-object/id-value-object'
import { InvalidParamError } from '../../../_shared/utils/errors'
import { badRequest, serverError } from '../../../_shared/utils/helpers/http-helpers'
import StudentGateway from '../../gateway/student-gateway'
import AddStudentUseCase from './add-student-usecase'
import { AddStudentUseCaseInputDTO } from './add-student-usecase-dto'

const makeFakeRequest: AddStudentUseCaseInputDTO = {
  name: 'valid_name',
  phone: '+244 900000000',
  email: 'valid_email@mail.com'
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
    expect(response.body.id).toBeTruthy()
  })

  test('Should throw if try to add a Student with already existen email', async () => {
    const { sut, repository } = makeSut()
    repository.find = jest.fn().mockImplementationOnce(() => makeFakeStudent)
    const promise = await sut.execute(makeFakeRequest)
    expect(promise).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if add throws', async () => {
    const { sut, repository } = makeSut()
    repository.add = jest.fn().mockReturnValueOnce(Promise.reject(new Error()))
    const promise = await sut.execute(makeFakeRequest)
    expect(promise).toEqual(serverError(new Error()))
  })
})
