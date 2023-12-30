import { AggregateRoot } from '@/Contexts/Shared/domain/AggregateRoot'
import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { FeedScrapedDomainEvent } from '@/Contexts/Shared/domain/FeedScrapedDomainEvent'

export class FeedScraped extends AggregateRoot {
  private title: string
  private description: string
  private source: Source
  private newsDate: Date

  constructor(
    title: string,
    description: string,
    source: Source,
    newsDate: Date
  ) {
    super()
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }

  static create({
    title,
    description = '',
    source,
  }: {
    title: string;
    description?: string;
    source: Source;
  }): FeedScraped {
    const feed = new FeedScraped(title, description, source, new Date())

    feed.record(
      new FeedScrapedDomainEvent({
        title: feed.title,
        description: feed.description,
        source: feed.source,
        newsDate: feed.newsDate,
      })
    )

    return feed
  }

  toPrimitives() {
    return {
      title: this.title,
      description: this.description,
      source: this.source,
      newsDate: this.newsDate,
    }
  }
}
