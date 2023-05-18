import WellComeEmail from './wellcome-email'

jest.setTimeout(100000)

describe('WellComeEmailUseCase tests', () => {
  test('Should be able to send email', async () => {
    const mailer = new WellComeEmail()
    await mailer.sendEmail('olivioramos333@gmail.com', 'Olívio Ramos')
    expect(1).toBe(1)
  })
})
