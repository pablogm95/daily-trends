import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/News/Feeds/domain/FeedRepository'
import { Feed } from '@/Contexts/News/Feeds/domain/Feed'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedFilters } from '@/Contexts/News/Feeds/domain/FeedFilters'

@Service()
export class GetFeeds implements UseCase {
  @Inject('News.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(filters: FeedFilters = {}): Promise<Feed[]> {
    const feeds = await this.feedRepository.searchBy(filters)

    return feeds
  }
}
