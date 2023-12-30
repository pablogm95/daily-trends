import expect from 'expect'
import sinon, { SinonFakeTimers } from 'sinon'
import { GetFeeds } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'
import { populateFeeds } from '@/../__mocks__/fixtures'
import { Source } from '../../../../Shared/domain/FeedSource'
import { FeedFilters } from '../../domain/FeedFilters'

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
    sinon
      .stub(FakeFeedRepository.prototype, 'searchBy')
      .resolves(expectedResult)

    const useCase = new GetFeeds(new FakeFeedRepository())

    const result = await useCase.run()

    expect(result).toStrictEqual(expectedResult)
  })

  it('should support all feed filters', async () => {
    const stubGetAll = sinon
      .stub(FakeFeedRepository.prototype, 'searchBy')
      .resolves(populateFeeds(10))

    const useCase = new GetFeeds(new FakeFeedRepository())

    const filters = FeedFilters.create({
      title: 'Title',
      source: Source.CUSTOM,
      startDate: new Date('2020/01/02 00:00:00:000'),
      endDate: new Date('2020/01/02 00:00:00:000'),
    })
    await useCase.run(filters)

    expect(stubGetAll.getCall(0).args[0]).toStrictEqual(filters)
  })
})
