export enum FeedSource {
  CUSTOM = 'custom',
  EL_PAIS = 'el-pais',
  EL_MUNDO = 'el-mundo',
}

export interface IFeed {
  readonly _id: string;
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
  readonly _id: string
  title: string
  description: string
  source: FeedSource
  newsDate: Date

  constructor({ _id, title, description, source, newsDate }: IFeed) {
    this._id = _id
    this.title = title
    this.description = description
    this.source = source
    this.newsDate = newsDate
  }
}
