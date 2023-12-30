import { FeedTitle } from './FeedTitle'
import { FeedSource, Source } from '../../../Shared/domain/FeedSource'
import { FeedNewsDate } from './FeedNewsDate'

export class FeedFilters {
  title?: FeedTitle
  source?: FeedSource
  startDate?: FeedNewsDate
  endDate?: FeedNewsDate

  constructor({
    title,
    source,
    startDate,
    endDate,
  }: {
    title?: FeedTitle;
    source?: FeedSource;
    startDate?: FeedNewsDate;
    endDate?: FeedNewsDate;
  }) {
    this.title = title
    this.source = source
    this.startDate = startDate
    this.endDate = endDate
  }

  static create({
    title,
    source,
    startDate,
    endDate,
  }: {
    title?: string;
    source?: Source;
    startDate?: Date | string;
    endDate?: Date | string;
  }): FeedFilters {
    const filters: {
      title?: FeedTitle;
      source?: FeedSource;
      startDate?: FeedNewsDate;
      endDate?: FeedNewsDate;
  } = {}

    if (title) filters.title = new FeedTitle(title)
    if (source) filters.source = new FeedSource(source)
    if (startDate) filters.startDate = new FeedNewsDate(startDate)
    if (endDate) filters.endDate = new FeedNewsDate(endDate)

    const feedFilters = new FeedFilters(filters)

    return feedFilters
  }
}
