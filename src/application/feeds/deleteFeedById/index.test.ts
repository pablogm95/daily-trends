import expect from 'expect'
import sinon from 'sinon'
import { DeleteFeedById } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'

describe('Delete feed by id use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should delete a feed by id', async () => {
    const stubDelete = sinon
      .stub(FakeFeedRepository.prototype, 'delete')
      .resolves()

    const useCase = new DeleteFeedById(new FakeFeedRepository())

    await useCase.execute('feedId')

    expect(stubDelete.getCall(0).args[0]).toBe('feedId')
  })
})
