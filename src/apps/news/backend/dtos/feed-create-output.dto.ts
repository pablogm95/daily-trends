import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { Feed } from '@/Contexts/News/Feeds/domain/Feed'

export class FeedCreateOutputDTO implements DataTransferObject<string> {
  private readonly feed: Feed

  constructor(feed: Feed) {
    this.feed = feed
  }

  sanitize() {
    return this.feed.toPrimitives().id
  }
}
