import { Inject, Service } from 'typedi'
import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import { FeedScrapedFactory } from '../../domain/FeedScrapedFactory'

@Service()
export class ScrapFeeds implements UseCase {
  @Inject('Content.Shared.EventBus')
  private eventBus: EventBus

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus
  }

  async run(data: { source: Source }): Promise<void> {
    const feedScrapedFactory = new FeedScrapedFactory()

    const feeds = await feedScrapedFactory.createScrapedFeeds(data.source)

    this.eventBus.publish(feeds.flatMap((feed) => feed.pullDomainEvents()))
  }
}
