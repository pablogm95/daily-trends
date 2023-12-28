import { request } from './utils'

describe('Rest API', () => {
  it('should response ping endpoint', async () => {
    await request.get('/status').expect(200)
  })
})
