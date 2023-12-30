import { FeedScrapStrategy } from './FeedScrapStrategy'

export type FeedScrapedItem = {
  title: string;
  description?: string;
};

export class FeedScraper {
  private strategy?: FeedScrapStrategy

  public setStrategy(strategy: FeedScrapStrategy) {
    this.strategy = strategy
  }

  public async executeStrategy(): Promise<Array<FeedScrapedItem>> {
    if (!this.strategy) throw new Error('Set a strategy before execute')

    const items = await this.strategy.execute()
    return items
  }
}
