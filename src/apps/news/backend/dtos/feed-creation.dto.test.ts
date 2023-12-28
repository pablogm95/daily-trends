/* eslint-disable @typescript-eslint/no-explicit-any */
import expect from 'expect'
import { FeedCreationDTO } from './feed-creation.dto'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'

describe('Feed Creation DTO', () => {
  it('should throw on fail validation', () => {
    const dataIn: any = {}

    expect(() => new FeedCreationDTO(dataIn).sanitize()).toThrowError(
      PropertyRequiredError
    )
  })

  it('should sanitize the entry params', () => {
    const dataIn: any = {
      title: ' Title ',
      description: 'Description ',
      source: 'custom',
      newsDate: '2020/01/01',
    }

    const result = new FeedCreationDTO(dataIn).sanitize()

    expect(result).toStrictEqual({
      title: 'Title',
      description: 'Description',
      source: 'custom',
      newsDate: new Date('2020/01/01'),
    })
  })
})
