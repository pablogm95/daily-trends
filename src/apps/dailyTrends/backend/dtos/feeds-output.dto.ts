import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { Feed } from '@/Contexts/DailyTrends/Feeds/domain/Feed'
import { FeedOutputDTO, IFeedOutputDTOResult } from './feed-output.dto'

export class FeedsOutputDTO implements DataTransferObject<IFeedOutputDTOResult[]> {
  private readonly feeds: FeedOutputDTO[]

  constructor(feeds: Feed[]) {
    this.feeds = feeds.map(feed => new FeedOutputDTO(feed))
  }

  sanitize() {
    return this.feeds.map(feed => feed.sanitize())
  }
}
