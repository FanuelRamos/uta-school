import UseCaseInterface from '../../../_shared/usecases/usecase-interface'
import { InvalidParamError } from '../../../_shared/utils/errors'
import Student from '../../entity/student-entity'
import StudentGateway from '../../gateway/student-gateway'
import { AddStudentUseCaseInputDTO, AddStudentUseCaseOutputDTO } from './add-student-usecase-dto'

export default class AddStudentUseCase implements UseCaseInterface<AddStudentUseCaseInputDTO, AddStudentUseCaseOutputDTO> {
  constructor (private readonly _repository: StudentGateway) {}

  async execute (input?: AddStudentUseCaseInputDTO): Promise<AddStudentUseCaseOutputDTO> {
    const emailAlreadyExists = await this._repository.find({ email: input.email })
    if (emailAlreadyExists) {
      throw new InvalidParamError('email')
    }
    const student = new Student(input)
    await this._repository.add(student)

    return {
      id: student.id.id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    }
  }
}
