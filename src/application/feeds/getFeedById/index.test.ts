import expect from 'expect'
import sinon from 'sinon'
import { GetFeedById } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'
import { populateFeed } from '@/../__mocks__/fixtures'

describe('Get feed by id use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should get a feed by id', async () => {
    const expectedResult = populateFeed()
    const stubGetById = sinon.stub(FakeFeedRepository.prototype, 'getById').resolves(expectedResult)

    const useCase = new GetFeedById(new FakeFeedRepository())

    const result = await useCase.execute('feedId')

    expect(result).toStrictEqual(expectedResult)
    expect(stubGetById.getCall(0).args[0]).toBe('feedId')
  })

  it('should return undefined on not found', async () => {
    const stubGetById = sinon.stub(FakeFeedRepository.prototype, 'getById').resolves(undefined)

    const useCase = new GetFeedById(new FakeFeedRepository())

    const result = await useCase.execute('feedId')

    expect(result).toBeUndefined()
    expect(stubGetById.getCall(0).args[0]).toBe('feedId')
  })
})
