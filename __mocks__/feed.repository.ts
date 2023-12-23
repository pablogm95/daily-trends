/* eslint-disable @typescript-eslint/no-unused-vars */
import { Feed } from '../src/entities/Feed'
import { FeedFilters, IFeedRepository } from '../src/repositories/feed.repository'

export class FakeFeedRepository implements IFeedRepository {
  create(feed: Feed): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getAll(filters?: FeedFilters | undefined): Promise<Feed[]> {
    throw new Error('Method not implemented.')
  }
  getById(feedId: string): Promise<Feed | undefined> {
    throw new Error('Method not implemented.')
  }
  update(feed: Feed): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(feedId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
