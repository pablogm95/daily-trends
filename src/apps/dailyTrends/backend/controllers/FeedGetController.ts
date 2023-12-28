import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { FeedId } from '@/Contexts/DailyTrends/Feeds/domain/FeedId'
import { GetFeedById } from '@/Contexts/DailyTrends/Feeds/application/getFeedById'
import { FeedOutputDTO } from '../dtos/feed-output.dto'

@Service()
export class FeedGetController implements Controller {
  async run(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    const result = await Container.get(GetFeedById).run(new FeedId(id))

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).end()
    } else {
      const response = new FeedOutputDTO(result).sanitize()
      res.status(StatusCodes.OK).send(response)
    }
  }
}
