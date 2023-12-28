/* eslint-disable @typescript-eslint/no-unused-vars */
import { Feed } from '@/Contexts/DailyTrends/Feeds/domain/Feed'
import { FeedFilters } from '@/Contexts/DailyTrends/Feeds/domain/FeedFilters'
import { FeedRepository } from '@/Contexts/DailyTrends/Feeds/domain/FeedRepository'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

export class FakeFeedRepository implements FeedRepository {
  searchBy(filters: FeedFilters): Promise<Feed[]> {
    throw new Error('Method not implemented.')
  }
  search(feedId: Uuid): Promise<Nullable<Feed>> {
    throw new Error('Method not implemented.')
  }
  delete(feedId: Uuid): Promise<void> {
    throw new Error('Method not implemented.')
  }
  save(feed: Feed): Promise<void> {
    throw new Error('Method not implemented.')
  }
  searchAll(): Promise<Feed[]> {
    throw new Error('Method not implemented.')
  }
}
