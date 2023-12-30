import { CreateFeed } from '@/Contexts/News/Feeds/application/createFeed'
import { DomainEventClass } from '@/Contexts/Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber'
import { FeedScrapedDomainEvent } from '@/Contexts/Shared/domain/FeedScrapedDomainEvent'
import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'

export class CreateFeedScrapedSubscription
implements DomainEventSubscriber<FeedScrapedDomainEvent>
{
  private readonly events = new Set<DomainEventClass>([FeedScrapedDomainEvent])

  constructor(private createFeedUseCase: CreateFeed) {}

  subscribedTo(): Set<DomainEventClass> {
    return this.events
  }

  async on(domainEvent: FeedScrapedDomainEvent): Promise<void> {
    try {
      await this.createFeedUseCase.run(domainEvent)
    } catch (error) {
      if (!(error instanceof AlreadyExistsError)) {
        throw error
      }
    }
  }
}
