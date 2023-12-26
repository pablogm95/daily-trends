import { Collection, Filter, MongoClient } from 'mongodb'
import { Feed, IFeed } from '../../../entities/Feed'
import {
  FeedFilters,
  IFeedRepository,
} from '../../../repositories/feed.repository'
import { FEED_COLLECTION } from '../../../constants'

export class MongoFeedRepository implements IFeedRepository {
  private readonly client: MongoClient
  private readonly collection: Collection<IFeed>

  /**
   * @param {MongoClient} client
   */
  constructor(client: MongoClient) {
    this.client = client
    this.collection = this.client.db().collection<IFeed>(FEED_COLLECTION)
  }

  async create(feed: Feed): Promise<void> {
    await this.collection.insertOne(feed)
  }

  async getAll(filters?: FeedFilters): Promise<Feed[]> {
    const filter = this.buildFilter(filters)
    const result = await this.collection.find(filter).toArray()
    return result.map((document) => new Feed(document))
  }

  async getById(feedId: string): Promise<Feed | undefined> {
    const result = await this.collection.findOne({ _id: feedId })
    return result ? new Feed(result) : undefined
  }

  async update(feed: Feed): Promise<void> {
    await this.collection.updateOne({ _id: feed._id }, { $set: feed })
  }

  async delete(feedId: string): Promise<void> {
    await this.collection.deleteOne({ _id: feedId })
  }

  /**
   * Create a query filter based on feed filters
   * @param filterParams Feed filters
   * @returns Filter Query
   */
  private buildFilter(filterParams?: FeedFilters) {
    const filter: Filter<IFeed> = {}

    if (filterParams?.title) {
      filter.title = filterParams.title
    }

    if (filterParams?.source) {
      filter.source = filterParams.source
    }

    if (filterParams?.startDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $gte: new Date(filterParams.startDate),
      }
    }
    if (filterParams?.endDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $lte: new Date(filterParams.endDate),
      }
    }

    return filter
  }
}