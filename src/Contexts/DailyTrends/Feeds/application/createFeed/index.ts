import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/DailyTrends/Feeds/domain/FeedRepository'
import {
  FeedSource,
  Source,
} from '@/Contexts/DailyTrends/Feeds/domain/FeedSource'
import { Feed } from '@/Contexts/DailyTrends/Feeds/domain/Feed'
import { FeedTitle } from '@/Contexts/DailyTrends/Feeds/domain/FeedTitle'
import { FeedDescription } from '@/Contexts/DailyTrends/Feeds/domain/FeedDescription'
import { FeedNewsDate } from '@/Contexts/DailyTrends/Feeds/domain/FeedNewsDate'
import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedId } from '@/Contexts/DailyTrends/Feeds/domain/FeedId'
import { FeedFilters } from '@/Contexts/DailyTrends/Feeds/domain/FeedFilters'

@Service()
export class CreateFeed implements UseCase {
  @Inject('DailyTrends.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(feedData: {
    title: string;
    description: string;
    source: Source;
    newsDate: Date;
  }): Promise<FeedId> {
    // Check if already exist with same title and source
    const feeds = await this.feedRepository.searchBy(
      FeedFilters.create({ title: feedData.title, source: feedData.source })
    )
    if (feeds.length > 0) throw new AlreadyExistsError()

    const feed = Feed.create({
      title: new FeedTitle(feedData.title),
      description: new FeedDescription(feedData.description),
      source: new FeedSource(feedData.source),
      newsDate: new FeedNewsDate(feedData.newsDate),
    })

    await this.feedRepository.save(feed)

    return feed.id
  }
}
