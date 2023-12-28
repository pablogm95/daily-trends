import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import { CreateFeed } from '@/Contexts/News/Feeds/application/createFeed'
import Container, { Service } from 'typedi'
import { FeedCreationDTO } from '../dtos/feed-creation.dto'
import { FeedCreateOutputDTO } from '../dtos/feed-create-output.dto'

@Service()
export class FeedPostController implements Controller {
  async run(req: Request, res: Response) {
    const feedCreationDTO = new FeedCreationDTO(req.body)

    const result = await Container.get(CreateFeed).run(
      feedCreationDTO.sanitize()
    )

    const response = new FeedCreateOutputDTO(result).sanitize()

    res.status(StatusCodes.CREATED).json(response)
  }
}
