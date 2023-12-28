import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/DailyTrends/Feeds/domain/FeedRepository'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { Feed } from '@/Contexts/DailyTrends/Feeds/domain/Feed'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'
import { UseCase } from '@/Contexts/Shared/application/UseCase'

@Service()
export class GetFeedById implements UseCase {
  @Inject('DailyTrends.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(feedId: Uuid): Promise<Nullable<Feed>> {
    return this.feedRepository.search(feedId)
  }
}
