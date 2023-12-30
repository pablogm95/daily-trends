import { Scraper } from '@/Contexts/Shared/domain/Scraper'
import { FeedScrapStrategy } from './FeedScrapStrategy'
import Container from 'typedi'
import { FeedScrapedItem } from './FeedScraper'

export class FeedScrapStrategyElMundo implements FeedScrapStrategy {
  private scraper: Scraper
  private readonly URL: URL = new URL('https://elmundo.es/')
  private readonly QUERY_SELECTORS: Map<keyof FeedScrapedItem, string> = new Map([
    ['title', '[data-mrf-recirculation="headlines_a"] article h2'],
  ])

  constructor() {
    this.scraper = Container.get('Content.Shared.Scraper')
  }

  async execute(): Promise<FeedScrapedItem[]> {
    return this.scraper.scrap<FeedScrapedItem>(
      this.URL,
      this.QUERY_SELECTORS
    )
  }
}
