import { Feed, FeedSource } from '../src/entities/Feed'
import { faker } from '@faker-js/faker'

/**
 * Select a random feed source
 * @returns A random feed source
 */
const randomFeedSource = (): FeedSource => {
  const feedSources =  Object.values(FeedSource)
  return feedSources[Math.floor(Math.random()*feedSources.length)]
}

/**
 * Populate a random feed
 * @returns random Feed
 */
export const populateFeed = () => {
  return new Feed({
    _id: faker.string.nanoid(),
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
