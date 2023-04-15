import UseCaseInterface from '../../../_shared/usecases/usecase-interface'
import { InvalidParamError } from '../../../_shared/utils/errors'
import { HttpResponse } from '../../../_shared/utils/helpers/http'
import { badRequest, ok, serverError } from '../../../_shared/utils/helpers/http-helpers'
import Student from '../../entity/student-entity'
import StudentGateway from '../../gateway/student-gateway'
import { AddStudentUseCaseInputDTO } from './add-student-usecase-dto'

export default class AddStudentUseCase implements UseCaseInterface<AddStudentUseCaseInputDTO, HttpResponse> {
  constructor (private readonly _repository: StudentGateway) {}

  async execute (input?: AddStudentUseCaseInputDTO): Promise<HttpResponse> {
    try {
      const emailAlreadyExists = await this._repository.find({ email: input.email })
      if (emailAlreadyExists) {
        return badRequest(new InvalidParamError('email'))
      }
      const student = new Student(input)
      await this._repository.add(student)

      return ok({
        id: student.id.id,
        name: student.name,
        phone: student.phone,
        email: student.email,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
