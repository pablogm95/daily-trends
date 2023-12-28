import { Feed } from './Feed'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { FeedFilters } from './FeedFilters'
import { FeedId } from './FeedId'

export interface FeedRepository {
  save(feed: Feed): Promise<void>;
  search(feedId: FeedId): Promise<Nullable<Feed>>;
  searchAll(): Promise<Array<Feed>>;
  searchBy(filters: FeedFilters): Promise<Array<Feed>>;
  delete(feedId: FeedId): Promise<void>;
}
