import MongoConfig from '../../../../../Shared/infrastructure/persistence/mongo/MongoConfig'
import { Config } from '@/config'

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: Config.MONGODB_URL,
    }
  }
}
