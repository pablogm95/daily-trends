import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent'

type ScrapedFeedDomainEventAttributes = {
  readonly title: string
  readonly description: string
  readonly source: string
  readonly newsDate: Date
};

export class FeedScrapedDomainEvent extends DomainEvent implements ScrapedFeedDomainEventAttributes {
  static readonly EVENT_NAME = 'feed.scraped'

  readonly title: string
  readonly description: string
  readonly source: string
  readonly newsDate: Date

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    title,
    description,
    source,
    newsDate,
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    title: string
    description: string
    source: string
    newsDate: Date
  }) {
    super({ eventName: FeedScrapedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }

  toPrimitives(): ScrapedFeedDomainEventAttributes {
    const { title, description, source, newsDate } = this
    return {
      title, description, source, newsDate
    }
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: ScrapedFeedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new FeedScrapedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
      title: attributes.title,
      description: attributes.description,
      source: attributes.source,
      newsDate: attributes.newsDate,
    })
  }
}
