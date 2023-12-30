import Container from 'typedi'
import { PubSubEventBus } from '@/Contexts/Shared/infrastructure/EventBus/PubSub/PubSubEventBus'
import { PuppeteerScraper } from '@/Contexts/Content/Shared/infrastructure/scraper/PuppeteerScraper'

// SHARED
Container.set(
  'Content.Shared.EventBus',
  new PubSubEventBus()
)

Container.set(
  'Content.Shared.Scraper',
  new PuppeteerScraper()
)
