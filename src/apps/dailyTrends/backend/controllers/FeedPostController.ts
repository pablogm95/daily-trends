import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import { CreateFeed } from '@/Contexts/DailyTrends/Feeds/application/createFeed'
import Container, { Service } from 'typedi'
import { FeedCreationDTO } from '../dtos/feed-creation.dto'

@Service()
export class FeedPostController implements Controller {
  async run(req: Request, res: Response) {
    const feedCreationDTO = new FeedCreationDTO(req.body)

    const response = await Container.get(CreateFeed).run(
      feedCreationDTO.sanitize()
    )

    res.status(StatusCodes.CREATED).json(response.value)
  }
}
