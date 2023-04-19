import ValidatorInterface from '../../../_shared/validators/validator-interface'
import Student from '../entity/student-entity'
import * as yup from 'yup'

export default class StudentYupValidator implements ValidatorInterface<Student> {
  validate (entity: Student): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('Name is required'),
          phone: yup.string().required('Phone is required'),
          email: yup.string().email().required('Email is required')
        })
        .validateSync(
          {
            name: entity.name,
            phone: entity.phone,
            email: entity.email
          },
          {
            abortEarly: false
          }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach((error) => {
        throw new Error(error)
      })
    }
  }
}
