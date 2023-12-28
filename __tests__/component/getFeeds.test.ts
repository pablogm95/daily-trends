import expect from 'expect'
import { request } from './utils'

describe('Get Feeds component test', () => {
  it('should get all today feeds by default', async () => {
    const response = await request
      .get('/feeds')
      .expect(200)

    expect(response.body).toStrictEqual([])
  })
})
