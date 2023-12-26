import expect from 'expect'
import sinon from 'sinon'
import { UpdateFeedById } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'
import { Feed, FeedSource } from '@/domain/entities/Feed'
import { populateFeed } from '@/../__mocks__/fixtures'
import { NotExistsError } from '@/domain/exceptions/not-exists.error'

describe('Update a feed by id use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should update a feed', async () => {
    const currentFeed = populateFeed()

    const stubUpdate = sinon.stub(FakeFeedRepository.prototype, 'update').resolves()
    sinon.stub(FakeFeedRepository.prototype, 'getById').resolves(currentFeed)

    const useCase = new UpdateFeedById(
      new FakeFeedRepository(),
    )

    await useCase.execute('feedId', {
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(stubUpdate.getCall(0).args[0]).toStrictEqual(
      new Feed({
        ...currentFeed,
        title: 'Feed title',
        description: 'Feed description',
        source: FeedSource.CUSTOM,
        newsDate: new Date('2020/01/01'),
      })
    )
  })

  it('should throw error if not exist', async () => {
    sinon.stub(FakeFeedRepository.prototype, 'getById').resolves(undefined)

    const useCase = new UpdateFeedById(
      new FakeFeedRepository(),
    )

    const result = useCase.execute('feedId', {
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    await expect(async () => await result).rejects.toThrowError(
      NotExistsError
    )
  })
})
