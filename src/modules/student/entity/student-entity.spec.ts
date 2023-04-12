import Student from './student-entity'

describe('StudentEntity test', () => {
  test('Should throw if required fields are missing', () => {
    expect(() => new Student({
      name: '',
      phone: '',
      email: ''
    })).toThrow()
  })

  test('Should throw if an invalid email is given', () => {
    expect(() => new Student({
      name: 'any_name',
      phone: '+244900000000',
      email: 'any_email'
    })).toThrow()
  })
})
