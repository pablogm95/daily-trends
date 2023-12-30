import { Feed } from '@/Contexts/News/Feeds/domain/Feed'
import { FeedDescription } from '@/Contexts/News/Feeds/domain/FeedDescription'
import { FeedNewsDate } from '@/Contexts/News/Feeds/domain/FeedNewsDate'
import { FeedSource, Source } from '@/Contexts/Shared/domain/FeedSource'
import { FeedTitle } from '@/Contexts/News/Feeds/domain/FeedTitle'
import { faker } from '@faker-js/faker'

/**
 * Select a random feed source
 * @returns A random feed source
 */
const randomFeedSource = (): Source => {
  const feedSources = FeedSource.getValidValues()
  return feedSources[Math.floor(Math.random()*feedSources.length)]
}

/**
 * Populate a random feed
 * @returns random Feed
 */
export const populateFeed = () => {
  return Feed.create({
    title: new FeedTitle(faker.lorem.sentence()),
    description: new FeedDescription(faker.lorem.paragraphs()),
    source: new FeedSource(randomFeedSource()),
    newsDate: new FeedNewsDate(faker.date.anytime()),
  })
}

/**
 * Populate a random feeds
 * @param length the amount of feeds to populate
 * @returns Array with random Feeds
 */
export const populateFeeds = (length: number) => {
  return Array.from({length}, () => populateFeed())
}
