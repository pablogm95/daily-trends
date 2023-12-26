import expect from 'expect'
import sinon from 'sinon'
import { CreateFeed } from '.'
import { FakeFeedRepository } from '../../../../__mocks__/feed.repository'
import { Feed, FeedSource } from '../../../entities/Feed'
import { AlreadyExistsError } from '../../../exceptions/already-exist.error'
import crypto from 'crypto'

describe('Create feed use case', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a new feed', async () => {
    sinon.stub(crypto, 'randomUUID').returns('1-2-3-4-5')
    const stubCreate = sinon
      .stub(FakeFeedRepository.prototype, 'create')
      .resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves([])

    const useCase = new CreateFeed(new FakeFeedRepository())

    await useCase.execute({
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(stubCreate.getCall(0).args[0]).toStrictEqual(
      new Feed({
        id: '1-2-3-4-5',
        title: 'Feed title',
        description: 'Feed description',
        source: FeedSource.CUSTOM,
        newsDate: new Date('2020/01/01'),
      })
    )
  })

  it('should return the new feed id', async () => {
    sinon.stub(crypto, 'randomUUID').returns('1-2-3-4-5')
    sinon.stub(FakeFeedRepository.prototype, 'create').resolves(undefined)
    sinon.stub(FakeFeedRepository.prototype, 'getAll').resolves([])

    const useCase = new CreateFeed(new FakeFeedRepository())

    const result = await useCase.execute({
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01'),
    })

    expect(result).toStrictEqual('1-2-3-4-5')
  })

  it('should avoid create duplicated feed from the same source', async () => {
    sinon.stub(crypto, 'randomUUID').returns('1-2-3-4-5')
    sinon.stub(FakeFeedRepository.prototype, 'create').resolves(undefined)
    const stubGetAll = sinon
      .stub(FakeFeedRepository.prototype, 'getAll')
      .resolves([
        new Feed({
          id: '1-2-3-4-5',
          title: 'Feed title',
          description: 'Feed description',
          source: FeedSource.CUSTOM,
          newsDate: new Date('2020/01/01'),
        }),
      ])

    const useCase = new CreateFeed(new FakeFeedRepository())

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
