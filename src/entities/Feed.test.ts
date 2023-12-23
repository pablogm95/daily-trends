import expect from 'expect'
import { Feed, FeedSource } from './Feed'

describe('Feed entity', () => {
  it('should be defined', () => {
    expect(Feed).toBeDefined()
  })

  it('should have property access', () => {
    const feed = new Feed({
      _id: 'feedId',
      title: 'Feed title',
      description: 'Feed description',
      source: FeedSource.CUSTOM,
      newsDate: new Date('2020/01/01')
    })

    expect(feed._id).toBe('feedId')
    expect(feed.title).toBe('Feed title')
    expect(feed.description).toBe('Feed description')
    expect(feed.source).toBe('custom')
    expect(feed.newsDate.toISOString()).toBe('2020-01-01T00:00:00.000Z')
  })
})
