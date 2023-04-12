import BaseEntity from '../../_shared/domain/entity/base-entity'
import Id from '../../_shared/domain/value-object/id-value-object'
import StudentValidatorFactory from '../factories/student-validator-factory'

type StudentProps = {
  id?: Id
  name: string
  phone: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export default class StudentEntity extends BaseEntity {
  private _name: string
  private _phone: string
  private _email: string

  constructor (props: StudentProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._phone = props.phone
    this._email = props.email

    this.validate()
  }

  validate (): void {
    StudentValidatorFactory.create().validate(this)
  }

  get name (): string { return this._name }
  get phone (): string { return this._phone }
  get email (): string { return this._email }

  set name (value: string) { this._name = value }
  set phone (value: string) { this._phone = value }
  set email (value: string) { this._email = value }
}
