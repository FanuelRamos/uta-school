import Student from './student-entity'

describe('StudentEntity test', () => {
  test('Should throw if required fields are missing', () => {
    expect(() => new Student({
      name: '',
      phone: '',
      email: ''
    })).toThrow()
  })
})
