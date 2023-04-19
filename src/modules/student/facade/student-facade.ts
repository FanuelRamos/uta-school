import UseCaseInterface from '../../../_shared/usecases/usecase-interface'
import { HttpResponse } from '../../../_shared/utils/helpers/http'
import { AddStudentFacadeInputDTO, FindStudentFacadeInputDTO, StudentFacadeInterface } from './student-facade-interface'

interface UseCaseProps {
  addStudentUseCase: UseCaseInterface<AddStudentFacadeInputDTO, HttpResponse>
  findStudentUseCase: UseCaseInterface<FindStudentFacadeInputDTO, HttpResponse>
}

export default class StudentFacade implements StudentFacadeInterface {
  private _addStudentUseCase: UseCaseInterface<AddStudentFacadeInputDTO, HttpResponse>
  private _findStudentUseCase: UseCaseInterface<FindStudentFacadeInputDTO, HttpResponse>

  constructor (props: UseCaseProps) {
    this._addStudentUseCase = props.addStudentUseCase
    this._findStudentUseCase = props.findStudentUseCase
  }

  async add (input: AddStudentFacadeInputDTO): Promise<HttpResponse> {
    return await this._addStudentUseCase.execute(input)
  }

  async find (input: FindStudentFacadeInputDTO): Promise<HttpResponse> {
    return await this._findStudentUseCase.execute(input)
  }
}
