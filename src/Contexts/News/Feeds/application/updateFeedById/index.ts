import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/News/Feeds/domain/FeedRepository'
import { NotExistsError } from '@/Contexts/Shared/domain/exceptions/NotExistsError'
import { FeedSource } from '@/Contexts/News/Feeds/domain/FeedSource'
import { FeedTitle } from '@/Contexts/News/Feeds/domain/FeedTitle'
import { FeedDescription } from '@/Contexts/News/Feeds/domain/FeedDescription'
import { FeedNewsDate } from '@/Contexts/News/Feeds/domain/FeedNewsDate'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedId } from '@/Contexts/News/Feeds/domain/FeedId'

@Service()
export class UpdateFeedById implements UseCase {
  @Inject('News.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(
    feedId: FeedId,
    feedData: {
      title?: FeedTitle;
      description?: FeedDescription;
      source?: FeedSource;
      newsDate?: FeedNewsDate;
    }
  ): Promise<void> {
    // Get feed to update
    const feed = await this.feedRepository.search(feedId)

    // Check if exist
    if (!feed) throw new NotExistsError()

    feed.update(feedData)

    await this.feedRepository.save(feed)
  }
}
