import expect from 'expect'
import sinon from 'sinon'
import { UpdateFeedById } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'
import { populateFeed } from '@/../__mocks__/fixtures'
import { FeedSource, Source } from '../../../../Shared/domain/FeedSource'
import { FeedTitle } from '../../domain/FeedTitle'
import { FeedDescription } from '../../domain/FeedDescription'
import { FeedNewsDate } from '../../domain/FeedNewsDate'
import { Feed } from '../../domain/Feed'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'
import { NotExistsError } from '@/Contexts/Shared/domain/exceptions/NotExistsError'
import { faker } from '@faker-js/faker'

describe('Update a feed by id use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should update a feed', async () => {
    const currentFeed = populateFeed()

    const stubUpdate = sinon.stub(FakeFeedRepository.prototype, 'save').resolves()
    sinon.stub(FakeFeedRepository.prototype, 'search').resolves(currentFeed)

    const useCase = new UpdateFeedById(
      new FakeFeedRepository(),
    )

    await useCase.run(currentFeed.id, {
      title: new FeedTitle('Feed title'),
      description: new FeedDescription('Feed description'),
      source: new FeedSource(Source.CUSTOM),
      newsDate: new FeedNewsDate('2020/01/01'),
    })

    expect(stubUpdate.getCall(0).args[0]).toStrictEqual(
      Feed.fromPrimitives({
        id: currentFeed.id.value,
        title: 'Feed title',
        description: 'Feed description',
        source: Source.CUSTOM,
        newsDate: new Date('2020/01/01'),
      })
    )
  })

  it('should throw error if not exist', async () => {
    sinon.stub(FakeFeedRepository.prototype, 'search').resolves(undefined)

    const useCase = new UpdateFeedById(
      new FakeFeedRepository(),
    )

    const result = useCase.run(new Uuid(faker.string.uuid()), {
      title: new FeedTitle('Feed title'),
      description: new FeedDescription('Feed description'),
      source: new FeedSource(Source.CUSTOM),
      newsDate: new FeedNewsDate('2020/01/01'),
    })

    await expect(async () => await result).rejects.toThrowError(
      NotExistsError
    )
  })
})
