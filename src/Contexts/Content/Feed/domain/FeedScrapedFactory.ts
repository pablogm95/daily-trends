import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { FeedScrapStrategy } from './FeedScrapStrategy'
import { FeedScraped } from './FeedScraped'
import { FeedScraper } from './FeedScraper'
import { FeedScrapStrategyElPais } from './FeedScrapStrategyElPais'
import { FeedScrapStrategyElMundo } from './FeedScrapStrategyElMundo'

export class FeedScrapedFactory {
  private readonly elPaisStrategy: FeedScrapStrategy
  private readonly elMundoStrategy: FeedScrapStrategy

  constructor() {
    this.elPaisStrategy = new FeedScrapStrategyElPais()
    this.elMundoStrategy = new FeedScrapStrategyElMundo()
  }

  async createScrapedFeeds(source: Source): Promise<FeedScraped[]> {
    const feedScraper = new FeedScraper()

    if (source === Source.EL_MUNDO) {
      feedScraper.setStrategy(this.elMundoStrategy)
    }
    if (source === Source.EL_PAIS) {
      feedScraper.setStrategy(this.elPaisStrategy)
    }

    const items = await feedScraper.executeStrategy()

    const feeds = items.map((item) =>
      FeedScraped.create({ ...item, source })
    )

    return feeds
  }
}
