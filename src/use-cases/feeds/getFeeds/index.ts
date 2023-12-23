import { Inject, Service } from 'typedi'
import { FeedFilters, IFeedRepository } from '../../../repositories/feed.repository'
import { FEED_REPOSITORY } from '../../../constants'
import { Feed } from '../../../entities/Feed'
import dayjs from 'dayjs'

@Service()
export class GetFeeds {
  constructor(
    @Inject(FEED_REPOSITORY) private readonly feedRepository: IFeedRepository
  ) {
    this.feedRepository = feedRepository
  }

  async execute(filters?: FeedFilters): Promise<Feed[]> {
    const defaultFilters: FeedFilters = {
      startDate: dayjs().startOf('day').toDate(),
      endDate: dayjs().endOf('day').toDate(),
    }

    const overwrittenFilters = {
      ...defaultFilters,
      ...filters
    }

    const feeds = await this.feedRepository.getAll(overwrittenFilters)

    return feeds
  }
}
