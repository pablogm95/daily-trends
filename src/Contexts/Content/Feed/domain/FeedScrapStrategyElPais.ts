import { Scraper } from '@/Contexts/Shared/domain/Scraper'
import { FeedScrapStrategy } from './FeedScrapStrategy'
import Container from 'typedi'
import { FeedScrapedItem } from './FeedScraper'

export class FeedScrapStrategyElPais implements FeedScrapStrategy {
  private scraper: Scraper
  private readonly URL: URL = new URL('https://elpais.com/')
  private readonly QUERY_SELECTORS: Map<keyof FeedScrapedItem, string> =
    new Map([
      ['title', 'section[data-dtm-region="portada_apertura"] article header'],
      ['description', 'section[data-dtm-region="portada_apertura"] article p'],
    ])

  constructor() {
    this.scraper = Container.get('Content.Shared.Scraper')
  }

  async execute(): Promise<FeedScrapedItem[]> {
    return this.scraper.scrap<FeedScrapedItem>(this.URL, this.QUERY_SELECTORS)
  }
}
