import { Inject, Service } from 'typedi'
import { IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY } from '../../../constants'
import { Feed, FeedSource } from '../../../entities/Feed'
import { AlreadyExistsError } from '../../../exceptions/already-exist.error'

@Service()
export class CreateFeed {
  @Inject(FEED_REPOSITORY)
  private readonly feedRepository: IFeedRepository

  constructor(feedRepository: IFeedRepository) {
    this.feedRepository = feedRepository
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

    const feed = Feed.create({
      title: feedData.title,
      description: feedData.description,
      source: feedData.source,
      newsDate: feedData.newsDate,
    })

    await this.feedRepository.create(feed)

    return feed.id
  }
}
