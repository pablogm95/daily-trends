import { Feed, IFeed } from '../entities/Feed'

export type FeedFilters = Partial<Pick<IFeed, 'title' | 'source'>> & {
  startDate?: Date
  endDate?: Date
}

export interface IFeedRepository {
  /**
   * Create a new feed
   * @param feed Feed to create
   */
  create(feed: Feed): Promise<void>

  /**
   * Get all feeds
   */
  getAll(filters?: FeedFilters): Promise<Feed[]>

  /**
   * Get an existent feed
   * @param feedId Feed id to fetch
   */
  getById(feedId: string): Promise<Feed | undefined>

  /**
   * Update feed
   * @param feed Feed to update
   */
  update(feed: Feed): Promise<void>

  /**
   * Delete a feed
   * @param feedId Feed to delete
   */
  delete(feedId: string): Promise<void>
}
