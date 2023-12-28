import { FeedRepository } from '@/Contexts/DailyTrends/Feeds/domain/FeedRepository'
import { Feed } from '@/Contexts/DailyTrends/Feeds/domain/Feed'
import { Source } from '@/Contexts/DailyTrends/Feeds/domain/FeedSource'
import { FeedId } from '@/Contexts/DailyTrends/Feeds/domain/FeedId'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoRepository'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { FeedFilters } from '@/Contexts/DailyTrends/Feeds/domain/FeedFilters'
import { Filter, Document } from 'mongodb'

interface FeedDocument extends Document {
  _id: string;
  title: string;
  description: string;
  source: Source;
  newsDate: Date;
}

export class MongoFeedRepository
  extends MongoRepository<Feed>
  implements FeedRepository
{
  protected collectionName(): string {
    return 'feeds'
  }

  public save(feed: Feed): Promise<void> {
    return this.persist(feed.id.value, feed)
  }

  public async search(id: FeedId): Promise<Nullable<Feed>> {
    const collection = await this.collection<FeedDocument>()
    const document = await collection.findOne({ _id: id.value })

    return document
      ? Feed.fromPrimitives({
        id: id.value,
        title: document.title,
        description: document.description,
        source: document.source,
        newsDate: document.newsDate,
      })
      : null
  }

  public async searchBy(filters: FeedFilters): Promise<Feed[]> {
    const documents = await this.searchByQuery<FeedDocument>(
      this.buildFilter(filters)
    )

    return documents.map((document) =>
      Feed.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        source: document.source,
        newsDate: document.newsDate,
      })
    )
  }

  public async searchAll(): Promise<Feed[]> {
    const collection = await this.collection()
    const documents = await collection.find<FeedDocument>({}, {}).toArray()

    return documents.map((document) =>
      Feed.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        source: document.source,
        newsDate: document.newsDate,
      })
    )
  }

  public async delete(id: FeedId): Promise<void> {
    const collection = await this.collection<FeedDocument>()
    await collection.deleteOne({ _id: id.value })
  }

  /**
   * Create a query filter based on feed filters
   * @param filterParams Feed filters
   * @returns Filter Query
   */
  private buildFilter(filterParams?: FeedFilters): Record<string, unknown> {
    const filter: Filter<FeedDocument> = {}

    if (filterParams?.title) {
      filter.title = filterParams.title.value
    }

    if (filterParams?.source) {
      filter.source = filterParams.source.value
    }

    if (filterParams?.startDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $gte: filterParams.startDate.value,
      }
    }
    if (filterParams?.endDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $lte: filterParams.endDate.value,
      }
    }

    return filter
  }
}
