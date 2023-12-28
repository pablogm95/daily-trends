import { z } from 'zod'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { Source } from '@/Contexts/DailyTrends/Feeds/domain/FeedSource'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'

interface IFeedCreationDTOResult {
  title: string;
  description: string;
  source: Source;
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
  source: z.nativeEnum(Source),
  newsDate: z.coerce.date()
})

export class FeedCreationDTO implements DataTransferObject<IFeedCreationDTOResult> {
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

  sanitize() {
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
