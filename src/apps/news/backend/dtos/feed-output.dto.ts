import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { Feed } from '@/Contexts/News/Feeds/domain/Feed'

export interface IFeedOutputDTOResult {
  title: string;
  description: string;
  source: string;
  newsDate?: Date;
}

export class FeedOutputDTO implements DataTransferObject<IFeedOutputDTOResult> {
  private readonly feed: Feed

  constructor(feed: Feed) {
    this.feed = feed
  }

  sanitize() {
    return this.feed.toPrimitives()
  }
}
