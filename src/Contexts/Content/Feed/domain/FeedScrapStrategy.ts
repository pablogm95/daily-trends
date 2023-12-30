import { FeedScrapedItem } from './FeedScraper'

export interface FeedScrapStrategy {
  execute(): Promise<Array<FeedScrapedItem>>;
}
