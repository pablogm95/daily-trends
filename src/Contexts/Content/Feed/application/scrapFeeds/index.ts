import { Inject, Service } from 'typedi'
import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import { FeedScraper } from '../../domain/FeedScraper'
import { FeedScrapStrategyElMundo } from '../../domain/FeedScrapStrategyElMundo'
import { FeedScrapStrategyElPais } from '../../domain/FeedScrapStrategyElPais'
import { FeedScraped } from '../../domain/FeedScraped'

@Service()
export class ScrapFeeds implements UseCase {
  @Inject('Content.Shared.EventBus')
  private eventBus: EventBus

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus
  }

  async run(data: { source: Source }): Promise<void> {
    const feedScraper = new FeedScraper()

    if (data.source === Source.EL_MUNDO) {
      feedScraper.setStrategy(new FeedScrapStrategyElMundo())
    } else if (data.source === Source.EL_PAIS) {
      feedScraper.setStrategy(new FeedScrapStrategyElPais())
    }

    const items = await feedScraper.executeStrategy()

    const feeds = items.map((item) =>
      FeedScraped.create({ ...item, source: data.source })
    )

    this.eventBus.publish(feeds.flatMap((feed) => feed.pullDomainEvents()))
  }
}
