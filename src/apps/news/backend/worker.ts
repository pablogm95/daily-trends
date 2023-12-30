import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import Container from 'typedi'
import { CreateFeedScrapedSubscription } from './subscriptions/CreateFeedScrapedSubscription'
import { CreateFeed } from '@/Contexts/News/Feeds/application/createFeed'

export class Worker {
  private readonly eventBus: EventBus

  constructor() {
    this.eventBus = Container.get('News.Shared.EventBus')
  }

  async start() {
    const subscribers = new Set<DomainEventSubscriber<DomainEvent>>([
      new CreateFeedScrapedSubscription(Container.get(CreateFeed)),
    ])

    await this.eventBus.addSubscribers(new Set(subscribers))

    console.info(`Worker is running in ${process.env.NODE_ENV} mode`)
  }
}
