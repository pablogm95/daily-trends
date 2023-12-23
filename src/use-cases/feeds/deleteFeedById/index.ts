import { Inject, Service } from 'typedi'
import { IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY } from '../../../constants'

@Service()
export class DeleteFeedById {
  constructor(
    @Inject(FEED_REPOSITORY) private readonly feedRepository: IFeedRepository
  ) {
    this.feedRepository = feedRepository
  }

  async execute(feedId: string): Promise<void> {
    await this.feedRepository.delete(feedId)
  }
}
