/* eslint-disable @typescript-eslint/no-explicit-any */
import expect from 'expect'
import { FeedUpdateDTO } from './feed-update.dto'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'
import { FeedTitle } from '@/Contexts/News/Feeds/domain/FeedTitle'
import { FeedDescription } from '@/Contexts/News/Feeds/domain/FeedDescription'
import { FeedSource, Source } from '@/Contexts/Shared/domain/FeedSource'
import { FeedNewsDate } from '@/Contexts/News/Feeds/domain/FeedNewsDate'

describe('Feed Update DTO', () => {
  it('should allow all optional properties', () => {
    const dataIn: any = {}

    const result = new FeedUpdateDTO(dataIn).sanitize()

    expect(result).toStrictEqual({
      title: undefined,
      description: undefined,
      source: undefined,
      newsDate: undefined,
    })
  })

  it('should sanitize the entry params', () => {
    const dataIn: any = {
      title: ' Title ',
      description: 'Description ',
      source: 'custom',
      newsDate: '2020/01/01',
    }

    const result = new FeedUpdateDTO(dataIn).sanitize()

    expect(result).toStrictEqual({
      title: new FeedTitle('Title'),
      description: new FeedDescription('Description'),
      source: new FeedSource(Source.CUSTOM),
      newsDate: new FeedNewsDate('2020/01/01'),
    })
  })

  it('should fail on malformed entry params', () => {
    const dataIn: any = {
      source: 'potato',
      newsDate: 'potato',
    }

    expect(() => new FeedUpdateDTO(dataIn).sanitize()).toThrowError(
      PropertyRequiredError
    )
  })
})
