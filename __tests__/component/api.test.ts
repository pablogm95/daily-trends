import expect from 'expect'
import request from 'supertest'

describe('Rest API', () => {
  it('should response ping endpoint', async () => {
    const result = await request('http://localhost:8080')
      .get('/ping')
      .expect(200)

    expect(result.body).toStrictEqual({ status: 'Alive' })
  })
})
