import mongoose from 'mongoose'
import request from 'supertest'
import app from '../config/app'
import { afterEach } from 'node:test'

let conn = null

describe('Student routes test', () => {
  beforeAll(async () => {
    conn = await mongoose.connect(process.env.MONGO_URI_TEST)
  })

  beforeEach(async () => {
    await mongoose.connection.dropCollection('students')
  })

  describe('POST /student', () => {
    test('Should return 200 on subscribe', async () => {
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

  describe('GET /student', () => {
    test('Should return 200 on find Student', async () => {
      await request(app)
        .post('/api/student')
        .send({
          name: 'any_name',
          phone: '+244 900000000',
          email: 'any_email@mail.com'
        })

      await request(app)
        .get('/api/student')
        .send({
          filter: {
            email: 'any_email@mail.com'
          }
        })
        .expect(200)
    })
  })

  afterAll(async () => {
    await conn.close
  })
})
