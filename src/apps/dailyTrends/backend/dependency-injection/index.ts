import Container from 'typedi'
import { MongoFeedRepository } from '@/Contexts/DailyTrends/Feeds/infrastructure/persistence/MongoFeedRepository'
import { MongoConfigFactory } from '@/Contexts/DailyTrends/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory'

// SHARED
Container.set(
  'DailyTrends.Shared.MongoConfig',
  MongoConfigFactory.createConfig()
)
Container.set(
  'DailyTrends.Shared.ConnectionManager',
  MongoClientFactory.createClient(
    'dailyTrends',
    Container.get('DailyTrends.Shared.MongoConfig')
  )
)

// FEEDS
Container.set(
  'DailyTrends.Feeds.domain.FeedRepository',
  new MongoFeedRepository(Container.get('DailyTrends.Shared.ConnectionManager'))
)
