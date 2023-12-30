import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { FeedCreationDTO } from '../dtos/feed-creation.dto'
import { ScrapFeeds } from '@/Contexts/Content/Feed/application/scrapFeeds'

@Service()
export class FeedPostController implements Controller {
  async run(req: Request<{ source: string }>, res: Response) {
    const feedCreationDTO = new FeedCreationDTO(req.params)

    await Container.get(ScrapFeeds).run(feedCreationDTO.sanitize())

    res.status(StatusCodes.ACCEPTED).end()
  }
}
