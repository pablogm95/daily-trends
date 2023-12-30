import { Feed } from '@/Contexts/News/Feeds/domain/Feed'
import { FeedSource, Source } from '@/Contexts/Shared/domain/FeedSource'
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
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    source: randomFeedSource(),
    newsDate: faker.date.anytime(),
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
