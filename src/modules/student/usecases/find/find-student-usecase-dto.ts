import { FilterQuery } from 'mongoose'

export interface FindStudentUseCaseInputDTO {
  filter: FilterQuery<unknown>
}
