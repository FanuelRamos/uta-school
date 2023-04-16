import UseCaseInterface from '../../../_shared/usecases/usecase-interface'
import { HttpResponse } from '../../../_shared/utils/helpers/http'
import { notFound, ok, serverError } from '../../../_shared/utils/helpers/http-helpers'
import StudentGateway from '../../gateway/student-gateway'
import { FindStudentUseCaseInputDTO } from './find-student-usecase-dto'

export default class FindStudentUseCase implements UseCaseInterface<FindStudentUseCaseInputDTO, HttpResponse> {
  constructor (private readonly _repoditory: StudentGateway) {}

  async execute (input?: FindStudentUseCaseInputDTO): Promise<HttpResponse> {
    try {
      const student = await this._repoditory.find(input.filter)

      if (!student) {
        return notFound('Student not found!')
      }

      return ok({
        id: student.id,
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
