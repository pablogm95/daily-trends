import { faker } from '@faker-js/faker'
import expect from 'expect'
import request from 'supertest'

describe('Create Feed component test', () => {
  it('should fail on check mandatory properties', async () => {
    const response = await request('http://localhost:8080')
      .post('/feeds')
      .expect(400)

    expect(response.body).toBe(
      JSON.stringify(
        [
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['title'],
            message: 'Required',
          },
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['description'],
            message: 'Required',
          },
          {
            expected: '\'custom\' | \'el-pais\' | \'el-mundo\'',
            received: 'undefined',
            code: 'invalid_type',
            path: ['source'],
            message: 'Required',
          },
          {
            code: 'invalid_date',
            path: ['newsDate'],
            message: 'Invalid date',
          },
        ],
        null,
        2
      )
    )
  })

  it('should create a feed and returns its id', async () => {
    const response = await request('http://localhost:8080')
      .post('/feeds')
      .send({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        source: 'custom',
        newsDate: faker.date.anytime(),
      })
      .expect(201)

    expect(response.body).toBeDefined()
    expect(typeof response.body).toBe('string')
  })
})
