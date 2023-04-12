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

  test('Should be able to create a Student', () => {
    const student = new Student({
      name: 'any_name',
      phone: '+244900000000',
      email: 'any_email@mail.com'
    })
    expect(student).toBeTruthy()
    expect(student.id).toBeTruthy()
    expect(student.name).toBe('any_name')
    expect(student.phone).toBe('+244900000000')
    expect(student.email).toBe('any_email@mail.com')
  })
})
