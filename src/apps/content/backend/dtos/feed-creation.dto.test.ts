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
      source: 'el-pais',
    }

    const result = new FeedCreationDTO(dataIn).sanitize()

    expect(result).toStrictEqual({
      source: 'el-pais',
    })
  })
})
