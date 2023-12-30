import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/News/Feeds/domain/FeedRepository'
import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { Feed } from '@/Contexts/News/Feeds/domain/Feed'
import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedFilters } from '@/Contexts/News/Feeds/domain/FeedFilters'

@Service()
export class CreateFeed implements UseCase {
  @Inject('News.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(feedData: {
    title: string;
    description: string;
    source: Source;
    newsDate: Date;
  }): Promise<Feed> {
    // Check if already exist with same title and source
    const feeds = await this.feedRepository.searchBy(
      FeedFilters.create({ title: feedData.title, source: feedData.source })
    )
    if (feeds.length > 0) throw new AlreadyExistsError()

    const feed = Feed.create({
      title: feedData.title,
      description: feedData.description,
      source: feedData.source,
      newsDate: feedData.newsDate,
    })

    await this.feedRepository.save(feed)

    return feed
  }
}
