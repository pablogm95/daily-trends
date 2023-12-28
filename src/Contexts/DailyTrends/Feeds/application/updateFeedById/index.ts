import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/DailyTrends/Feeds/domain/FeedRepository'
import { NotExistsError } from '@/Contexts/Shared/domain/exceptions/NotExistsError'
import { FeedSource } from '@/Contexts/DailyTrends/Feeds/domain/FeedSource'
import { FeedTitle } from '@/Contexts/DailyTrends/Feeds/domain/FeedTitle'
import { FeedDescription } from '@/Contexts/DailyTrends/Feeds/domain/FeedDescription'
import { FeedNewsDate } from '@/Contexts/DailyTrends/Feeds/domain/FeedNewsDate'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedId } from '@/Contexts/DailyTrends/Feeds/domain/FeedId'

@Service()
export class UpdateFeedById implements UseCase {
  @Inject('DailyTrends.Feeds.domain.FeedRepository')
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
