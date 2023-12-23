import { Inject, Service } from 'typedi'
import { IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY } from '../../../constants'
import { FeedSource } from '../../../entities/Feed'
import { NotExistsError } from '../../../exceptions/not-exists.error'

@Service()
export class UpdateFeedById {
  constructor(
    @Inject(FEED_REPOSITORY) private readonly feedRepository: IFeedRepository,
  ) {
    this.feedRepository = feedRepository
  }

  async execute(feedId: string, feedData: {
    title?: string;
    description?: string;
    source?: FeedSource;
    newsDate?: Date;
  }): Promise<void> {
    // Get feed to update
    const feed = await this.feedRepository.getById(feedId)

    // Check if exist
    if (!feed) throw new NotExistsError()

    if (feedData.title) feed.title = feedData.title
    if (feedData.description) feed.description = feedData.description
    if (feedData.source) feed.source = feedData.source
    if (feedData.newsDate) feed.newsDate = feedData.newsDate

    await this.feedRepository.update(feed)
  }
}
