import expect from 'expect'
import sinon from 'sinon'
import { CreateFeed } from '.'
import { FakeFeedRepository } from '@/../__mocks__/feed.repository'
import { Feed } from '@/Contexts/News/Feeds/domain/Feed'
import { Source } from '@/Contexts/News/Feeds/domain/FeedSource'
import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'
import { faker } from '@faker-js/faker'
import { FeedId } from '../../domain/FeedId'


describe('Create feed use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a new feed', async () => {
    const uuid = faker.string.uuid()
    sinon.stub(Uuid, 'random').returns(new Uuid(uuid))
    const stubCreate = sinon
      .stub(FakeFeedRepository.prototype, 'save')
      .resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'searchBy').resolves([])

    const useCase = new CreateFeed(new FakeFeedRepository())

    await useCase.run({
      title: 'Feed title',
      description: 'Feed description',
      source: Source.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(stubCreate.getCall(0).args[0]).toStrictEqual(
      Feed.fromPrimitives({
        id: uuid,
        title: 'Feed title',
        description: 'Feed description',
        source: Source.CUSTOM,
        newsDate: new Date('2020/01/01'),
      })
    )
  })

  it('should return the new feed id', async () => {
    const uuid = faker.string.uuid()
    sinon.stub(Uuid, 'random').returns(new Uuid(uuid))
    sinon.stub(FakeFeedRepository.prototype, 'save').resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'searchBy').resolves([])

    const useCase = new CreateFeed(new FakeFeedRepository())

    const result = await useCase.run({
      title: 'Feed title',
      description: 'Feed description',
      source: Source.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(result).toStrictEqual(new FeedId(uuid))
  })

  it('should avoid create duplicated feed from the same source', async () => {
    const uuid = faker.string.uuid()
    sinon.stub(Uuid, 'random').returns(new Uuid(uuid))
    sinon.stub(FakeFeedRepository.prototype, 'save').resolves(undefined)
    sinon
      .stub(FakeFeedRepository.prototype, 'searchBy')
      .resolves([
        Feed.fromPrimitives({
          id: uuid,
          title: 'Feed title',
          description: 'Feed description',
          source: Source.CUSTOM,
          newsDate: new Date('2020/01/01'),
        })
      ])

    const useCase = new CreateFeed(new FakeFeedRepository())

    const result = useCase.run({
      title: 'Feed title',
      description: 'Feed description',
      source: Source.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    await expect(async () => await result).rejects.toThrowError(
      AlreadyExistsError
    )
  })
})
