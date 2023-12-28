import { z } from 'zod'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import {
  FeedSource,
  Source,
} from '@/Contexts/News/Feeds/domain/FeedSource'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'
import { FeedFilters } from '@/Contexts/News/Feeds/domain/FeedFilters'
import { FeedTitle } from '@/Contexts/News/Feeds/domain/FeedTitle'
import { FeedNewsDate } from '@/Contexts/News/Feeds/domain/FeedNewsDate'
import dayjs from 'dayjs'

interface IFeedFiltersDTOParams {
  title?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
}

const schema = z.object({
  title: z
    .string()
    .trim()
    .transform((value) => new FeedTitle(value))
    .optional(),
  source: z
    .nativeEnum(Source)
    .transform((value) => new FeedSource(value))
    .optional(),
  startDate: z.coerce
    .date()
    .default(dayjs().startOf('day').toDate())
    .transform((value) => new FeedNewsDate(value)),
  endDate: z.coerce
    .date()
    .default(dayjs().endOf('day').toDate())
    .transform((value) => new FeedNewsDate(value)),
})

export class FeedFiltersDTO implements DataTransferObject<FeedFilters> {
  title?: string
  source?: string
  startDate?: string
  endDate?: string

  constructor({ title, source, startDate, endDate }: IFeedFiltersDTOParams) {
    this.title = title
    this.source = source
    this.startDate = startDate
    this.endDate = endDate
  }

  sanitize() {
    const result = schema.safeParse({
      title: this.title,
      source: this.source,
      startDate: this.startDate,
      endDate: this.endDate,
    })

    if (!result.success) {
      throw new PropertyRequiredError(result.error.message)
    } else {
      return result.data
    }
  }
}
