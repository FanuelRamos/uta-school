import ValidatorInterface from '../../_shared/validators/validator-interface'
import Student from '../entity/student-entity'
import StudentYupValidator from '../validators/student-yup-validator'

export default class StudentValidatorFactory {
  static create (): ValidatorInterface<Student> {
    return new StudentYupValidator()
  }
}
