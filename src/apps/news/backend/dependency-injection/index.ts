import Container from 'typedi'
import { MongoFeedRepository } from '@/Contexts/News/Feeds/infrastructure/persistence/MongoFeedRepository'
import { MongoConfigFactory } from '@/Contexts/News/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory'

// SHARED
Container.set(
  'News.Shared.MongoConfig',
  MongoConfigFactory.createConfig()
)
Container.set(
  'News.Shared.ConnectionManager',
  MongoClientFactory.createClient(
    'news',
    Container.get('News.Shared.MongoConfig')
  )
)

// FEEDS
Container.set(
  'News.Feeds.domain.FeedRepository',
  new MongoFeedRepository(Container.get('News.Shared.ConnectionManager'))
)
