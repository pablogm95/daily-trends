import { z } from 'zod'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { FeedSource, Source } from '@/Contexts/Shared/domain/FeedSource'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'
import { FeedTitle } from '@/Contexts/News/Feeds/domain/FeedTitle'
import { FeedDescription } from '@/Contexts/News/Feeds/domain/FeedDescription'
import { FeedNewsDate } from '@/Contexts/News/Feeds/domain/FeedNewsDate'

interface IFeedUpdateDTOResult {
  title?: FeedTitle;
  description?: FeedDescription;
  source?: FeedSource;
  newsDate?: FeedNewsDate;
}

interface IFeedUpdateDTOParams {
  title?: string;
  description?: string;
  source?: string;
  newsDate?: string;
}

const schema = z.object({
  title: z.string().trim().transform(value => new FeedTitle(value)).optional(),
  description: z.string().trim().transform(value => new FeedDescription(value)).optional(),
  source: z.nativeEnum(Source).transform(value => new FeedSource(value)).optional(),
  newsDate: z.coerce.date().transform(value => new FeedNewsDate(value)).optional()
})

export class FeedUpdateDTO implements DataTransferObject<IFeedUpdateDTOResult> {
  title?: string
  description?: string
  source?: string
  newsDate?: string

  constructor({
    title,
    description,
    source,
    newsDate,
  }: IFeedUpdateDTOParams) {
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
