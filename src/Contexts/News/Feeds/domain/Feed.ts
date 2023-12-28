import { AggregateRoot } from '../../../Shared/domain/AggregateRoot'
import { FeedScrapedDomainEvent } from './FeedScrapedDomainEvent'
import { FeedId } from './FeedId'
import { FeedTitle } from './FeedTitle'
import { FeedDescription } from './FeedDescription'
import { FeedSource, Source } from './FeedSource'
import { FeedNewsDate } from './FeedNewsDate'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

export class Feed extends AggregateRoot {
  readonly id: FeedId
  private title: FeedTitle
  private description: FeedDescription
  private source: FeedSource
  private newsDate: FeedNewsDate

  constructor(
    id: FeedId,
    title: FeedTitle,
    description: FeedDescription,
    source: FeedSource,
    newsDate: FeedNewsDate
  ) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }

  static create({
    title,
    description,
    source,
    newsDate,
  }: {
    title: string;
    description: string;
    source: Source;
    newsDate: Date | string;
  }): Feed {
    const feed = new Feed(
      FeedId.random(),
      new FeedTitle(title),
      new FeedDescription(description),
      new FeedSource(source),
      new FeedNewsDate(newsDate)
    )

    // Domain event when required

    return feed
  }

  static scrap(
    title: FeedTitle,
    description: FeedDescription,
    source: FeedSource,
    newsDate: FeedNewsDate
  ): Feed {
    const feed = new Feed(Uuid.random(), title, description, source, newsDate)

    feed.record(
      new FeedScrapedDomainEvent({
        aggregateId: feed.id.value,
        title: feed.title.value,
        description: feed.description.value,
        source: feed.source.value,
        newsDate: feed.newsDate.value,
      })
    )

    return feed
  }

  static fromPrimitives(plainData: {
    id: string;
    title: string;
    description: string;
    source: Source;
    newsDate: string | Date;
  }): Feed {
    return new Feed(
      new FeedId(plainData.id),
      new FeedTitle(plainData.title),
      new FeedDescription(plainData.description),
      new FeedSource(plainData.source),
      new FeedNewsDate(plainData.newsDate)
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      source: this.source.value,
      newsDate: this.newsDate.value,
    }
  }

  public update(feedData: {
    title?: FeedTitle;
    description?: FeedDescription;
    source?: FeedSource;
    newsDate?: FeedNewsDate;
  }): void {
    if (feedData.title) this.title = feedData.title
    if (feedData.description) this.description = feedData.description
    if (feedData.source) this.source = feedData.source
    if (feedData.newsDate) this.newsDate = feedData.newsDate
  }
}
