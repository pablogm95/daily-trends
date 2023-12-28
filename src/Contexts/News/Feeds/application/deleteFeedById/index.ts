import { Inject, Service } from 'typedi'
import { FeedRepository } from '@/Contexts/News/Feeds/domain/FeedRepository'
import { NotExistsError } from '@/Contexts/Shared/domain/exceptions/NotExistsError'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { FeedId } from '@/Contexts/News/Feeds/domain/FeedId'

@Service()
export class DeleteFeedById implements UseCase {
  @Inject('News.Feeds.domain.FeedRepository')
  private readonly feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async run(feedId: FeedId): Promise<void> {
    const feed = await this.feedRepository.search(feedId)
    if (!feed) throw new NotExistsError()

    await this.feedRepository.delete(feed.id)
  }
}
