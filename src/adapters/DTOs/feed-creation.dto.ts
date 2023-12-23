import { z } from 'zod'
import { FeedSource } from '../../entities/Feed'
import { PropertyRequiredError } from '../../exceptions/property-required.error'

interface IFeedCreationDTOResult {
  title: string;
  description: string;
  source: FeedSource;
  newsDate: Date;
}

interface IFeedCreationDTOParams {
  title: string;
  description: string;
  source: string;
  newsDate: string;
}

const schema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  source: z.nativeEnum(FeedSource),
  newsDate: z.coerce.date()
})

export class FeedCreationDTO {
  title: string
  description: string
  source: string
  newsDate: string

  constructor({
    title,
    description,
    source,
    newsDate,
  }: IFeedCreationDTOParams) {
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }

  sanitize(): IFeedCreationDTOResult {
    const result = schema.safeParse({
      title: this.title,
      description: this.description,
      source: this.source,
      newsDate: this.newsDate,
    })


    if (!result.success) {
      throw new PropertyRequiredError(result.error.message)
    } else {
      return result.data
    }
  }
}
