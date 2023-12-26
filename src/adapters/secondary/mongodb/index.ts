import { MongoClient, Db } from 'mongodb'
import { Config } from '@/config'

export class MongoManager {
  private client?: MongoClient

  /**
   * @returns {Promise<MongoClient>}
   */
  async connect() {
    try {
      this.client = new MongoClient(Config.MONGODB_URI, {
        auth: {
          username: Config.MONGODB_USERNAME,
          password: Config.MONGODB_PASSWORD,
        },
      })

      // CONNECT WITH THE DATABASE
      await this.client.connect()

      console.info('Database connected')

      return this.client
    } catch (error) {
      console.error('An error occurred connecting to the database', error)
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async closeConnection() {
    try {
      this.client?.close()
      this.client = undefined
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @returns {MongoClient}
   */
  getClient(): MongoClient | undefined {
    return this.client
  }

  /**
   * @returns {Db}
   */
  getDatabase(): Db | undefined {
    return this.client?.db()
  }
}
