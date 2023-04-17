import StudentFacade from '../facade/student-facade'
import { StudentFacadeInterface } from '../facade/student-facade-interface'
import StudentRepository from '../repository/student-repository'
import AddStudentUseCase from '../usecases/add/add-student-usecase'
import FindStudentUseCase from '../usecases/find/find-student-usecase'

export default class StudentFacadeFactory {
  static create (): StudentFacadeInterface {
    const repository = new StudentRepository()
    const addStudentUseCase = new AddStudentUseCase(repository)
    const findStudentUseCase = new FindStudentUseCase(repository)

    const studentFacade = new StudentFacade({
      addStudentUseCase,
      findStudentUseCase
    })

    return studentFacade
  }
}
