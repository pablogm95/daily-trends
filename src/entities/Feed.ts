export enum FeedSource {
  CUSTOM = 'custom',
  EL_PAIS = 'el-pais',
  EL_MUNDO = 'el-mundo',
}

export interface IFeed {
  readonly id: string;
  title: string;
  description: string;
  /**
   * Source where the news was taken from
   */
  source: FeedSource;
  /**
   * The news date
   */
  newsDate: Date;
}

export class Feed implements IFeed {
  readonly id: string
  title: string
  description: string
  source: FeedSource
  newsDate: Date

  constructor({ id, title, description, source, newsDate }: IFeed) {
    this.id = id
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }
}
