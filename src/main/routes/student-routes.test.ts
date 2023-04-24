import mongoose from 'mongoose'
import request from 'supertest'
import app from '../config/app'

let conn = null

describe('Student routes test', () => {
  beforeAll(async () => {
    conn = await mongoose.connect(process.env.MONGO_URI)
  })

  describe('POST /student', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/student')
        .send({
          name: 'any_name',
          phone: '+244 900000000',
          email: 'any_email@mail.com'
        })
        .expect(200)
    })
  })

  afterAll(async () => {
    await conn.close
  })
})
