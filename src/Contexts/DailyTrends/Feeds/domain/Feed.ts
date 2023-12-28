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
  readonly title: FeedTitle
  readonly description: FeedDescription
  readonly source: FeedSource
  readonly newsDate: FeedNewsDate

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
    title: FeedTitle;
    description: FeedDescription;
    source: FeedSource;
    newsDate: FeedNewsDate;
  }): Feed {
    const feed = new Feed(new FeedId(Uuid.random().value), title, description, source, newsDate)

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
  }): Feed {
    const feed = { ...this.toPrimitives() }
    if (feedData.title && !this.title.equals(feedData.title))
      feed.title = feedData.title.value
    if (feedData.description && !this.description.equals(feedData.description))
      feed.description = feedData.description.value
    if (feedData.source && !this.source.equals(feedData.source))
      feed.source = feedData.source.value
    if (feedData.newsDate && !this.newsDate.equals(feedData.newsDate))
      feed.newsDate = feedData.newsDate.value

    return Feed.fromPrimitives(feed)
  }
}
