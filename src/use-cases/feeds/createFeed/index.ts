import { Inject, Service } from 'typedi'
import { IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY, ID_GENERATOR } from '../../../constants'
import { IIDGenerator } from '../../../ports/id-generator'
import { Feed, FeedSource } from '../../../entities/Feed'
import { AlreadyExistsError } from '../../../exceptions/already-exist.error'

@Service()
export class CreateFeed {
  constructor(
    @Inject(FEED_REPOSITORY) private readonly feedRepository: IFeedRepository,
    @Inject(ID_GENERATOR) private readonly idGenerator: IIDGenerator
  ) {
    this.feedRepository = feedRepository
    this.idGenerator = idGenerator
  }

  async execute(feedData: {
    title: string;
    description: string;
    source: FeedSource;
    newsDate: Date;
  }): Promise<string> {
    // Check if already exist with same title and source
    const feeds = await this.feedRepository.getAll({
      title: feedData.title,
      source: feedData.source,
    })
    if (feeds.length > 0) throw new AlreadyExistsError()

    const feed = new Feed({
      _id: this.idGenerator.generate(),
      title: feedData.title,
      description: feedData.description,
      source: feedData.source,
      newsDate: feedData.newsDate,
    })

    await this.feedRepository.create(feed)

    return feed._id
  }
}
