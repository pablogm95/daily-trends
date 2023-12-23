import expect from 'expect'
import sinon from 'sinon'
import { CreateFeed } from '.'
import { FakeIdGenerator } from '../../../../__mocks__/id-generator'
import { FakeFeedRepository } from '../../../../__mocks__/feed.repository'
import { Feed, FeedSource } from '../../../entities/Feed'
import { AlreadyExistsError } from '../../../exceptions/already-exist.error'

describe('Create feed use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a new feed', async () => {
    sinon.stub(FakeIdGenerator.prototype, 'generate').returns('123')
    const stubCreate = sinon.stub(FakeFeedRepository.prototype, 'create').resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves([])

    const useCase = new CreateFeed(
      new FakeFeedRepository(),
      new FakeIdGenerator()
    )

    await useCase.execute({
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(stubCreate.getCall(0).args[0]).toStrictEqual(
      new Feed({
        _id: '123',
        title: 'Feed title',
        description:'Feed description',
        source: FeedSource.CUSTOM,
        newsDate: new Date('2020/01/01')
      })
    )
  })

  it('should return the new feed id', async () => {
    sinon.stub(FakeIdGenerator.prototype, 'generate').returns('123')
    sinon.stub(FakeFeedRepository.prototype, 'create').resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves([])

    const useCase = new CreateFeed(
      new FakeFeedRepository(),
      new FakeIdGenerator()
    )

    const result = await useCase.execute({
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(result).toStrictEqual('123')
  })

  it('should avoid create duplicated feed from the same source', async () => {
    sinon.stub(FakeIdGenerator.prototype, 'generate').returns('123')
    sinon.stub(FakeFeedRepository.prototype, 'create').resolves(undefined)
    const stubGetAll = sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves([new Feed({
      _id: '123',
      title: 'Feed title',
      description:'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01')
    })])

    const useCase = new CreateFeed(
      new FakeFeedRepository(),
      new FakeIdGenerator()
    )

    const result = useCase.execute({
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    await expect(async () => await result).rejects.toThrowError(
      AlreadyExistsError
    )
    expect(stubGetAll.getCall(0).args[0]).toStrictEqual({
      title: 'Feed title',
      source: FeedSource.CUSTOM,
    })
  })
})
