import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent'

type CreateFeedDomainEventAttributes = {
  readonly title: string;
  readonly description: string;
  readonly source: Source;
  readonly newsDate: Date;
};

export class FeedScrapedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'feed.scraped'

  readonly title: string
  readonly description: string
  readonly source: Source
  readonly newsDate: Date

  constructor({
    eventId,
    title,
    description,
    source,
    newsDate,
  }: {
    eventId?: string;
    title: string;
    description: string;
    source: Source;
    newsDate: Date | string;
  }) {
    super(eventId)
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = new Date(newsDate)
  }

  public eventName(): string {
    return FeedScrapedDomainEvent.EVENT_NAME
  }

  toPrimitives(): CreateFeedDomainEventAttributes {
    const { title, description, source, newsDate } = this
    return { title, description, source, newsDate }
  }

  static fromPrimitives(params: {
    eventId: string;
    attributes: CreateFeedDomainEventAttributes;
  }): DomainEvent {
    const { attributes, eventId } = params
    return new FeedScrapedDomainEvent({
      eventId,
      title: attributes.title,
      description: attributes.description,
      source: attributes.source,
      newsDate: attributes.newsDate,
    })
  }
}
