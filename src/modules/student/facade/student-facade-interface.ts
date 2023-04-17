import { FilterQuery } from 'mongoose'
import { HttpResponse } from '../../_shared/utils/helpers/http'

export interface AddStudentFacadeInputDTO {
  name: string
  phone: string
  email: string
}

export interface FindStudentFacadeInputDTO {
  filter: FilterQuery<unknown>
}

export interface StudentFacadeInterface {
  add(input: AddStudentFacadeInputDTO): Promise<HttpResponse>
  find(input: FindStudentFacadeInputDTO): Promise<HttpResponse>
}
