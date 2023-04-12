export interface AddStudentUseCaseInputDTO {
  name: string
  phone: string
  email: string
}

export interface AddStudentUseCaseOutputDTO {
  id: string
  name: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}
