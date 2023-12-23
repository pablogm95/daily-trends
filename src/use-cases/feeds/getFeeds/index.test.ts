import expect from 'expect'
import sinon, { SinonFakeTimers } from 'sinon'
import { GetFeeds } from '.'
import { FakeFeedRepository } from '../../../../__mocks__/feed.repository'
import { populateFeeds } from '../../../../__mocks__/fixtures'
import { FeedSource } from '../../../entities/Feed'

describe('Get feeds use case', () => {
  const now = new Date('2020/01/01')
  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers(now.getTime())
  })

  afterEach(() => {
    clock.restore()
    sinon.restore()
  })

  it('should get all feeds', async () => {
    const expectedResult = populateFeeds(10)
    sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves(expectedResult)

    const useCase = new GetFeeds(new FakeFeedRepository())

    const result = await useCase.execute()

    expect(result).toStrictEqual(expectedResult)
  })

  it('should filter today feeds by default', async () => {
    const stubGetAll = sinon
      .stub(FakeFeedRepository.prototype, 'getAll')
      .resolves(populateFeeds(10))

    const useCase = new GetFeeds(new FakeFeedRepository())

    await useCase.execute()

    expect(stubGetAll.getCall(0).args[0]).toStrictEqual({
      startDate: new Date('2020/01/01 00:00'),
      endDate: new Date('2020/01/01 23:59:59.999'),
    })
  })

  it('should support all feed filters', async () => {
    const stubGetAll = sinon
      .stub(FakeFeedRepository.prototype, 'getAll')
      .resolves(populateFeeds(10))

    const useCase = new GetFeeds(new FakeFeedRepository())

    await useCase.execute({
      title: 'Title',
      source: FeedSource.CUSTOM,
      startDate: new Date('2020/01/02 00:00'),
      endDate: new Date('2020/01/02 23:59:59.999'),
    })

    expect(stubGetAll.getCall(0).args[0]).toStrictEqual({
      title: 'Title',
      source: FeedSource.CUSTOM,
      startDate: new Date('2020/01/02 00:00'),
      endDate: new Date('2020/01/02 23:59:59.999'),
    })
  })
})
