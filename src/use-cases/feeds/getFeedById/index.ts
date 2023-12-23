import { Inject, Service } from 'typedi'
import { IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY } from '../../../constants'
import { Feed } from '../../../entities/Feed'

@Service()
export class GetFeedById {
  constructor(
    @Inject(FEED_REPOSITORY) private readonly feedRepository: IFeedRepository
  ) {
    this.feedRepository = feedRepository
  }

  async execute(feedId: string): Promise<Feed | undefined> {
    const feed = await this.feedRepository.getById(feedId)

    return feed
  }
}
