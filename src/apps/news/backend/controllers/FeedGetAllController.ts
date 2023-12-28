import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { GetFeeds } from '@/Contexts/News/Feeds/application/getFeeds'
import { FeedFiltersDTO } from '../dtos/feed-filters.dto'
import { FeedsOutputDTO } from '../dtos/feeds-output.dto'

@Service()
export class FeedGetAllController implements Controller {
  async run(req: Request, res: Response) {
    const feedCreationDTO = new FeedFiltersDTO(req.query)

    const result = await Container.get(GetFeeds).run(
      feedCreationDTO.sanitize()
    )

    const response = new FeedsOutputDTO(result).sanitize()

    res.status(StatusCodes.OK).json(response)
  }
}
