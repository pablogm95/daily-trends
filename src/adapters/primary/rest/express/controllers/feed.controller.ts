import Container from 'typedi'
import { CreateFeed } from '../../../../../use-cases/feeds/createFeed'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { FeedCreationDTO } from '../../../../DTOs/feed-creation.dto'

export class FeedController {
  private readonly createFeedUseCase = Container.get(CreateFeed)

  createFeed = async (req: Request, res: Response) => {
    const feedCreationDTO = new FeedCreationDTO(req.body)

    const response = await this.createFeedUseCase.execute(
      feedCreationDTO.sanitize()
    )

    res.status(StatusCodes.CREATED).json(response)
  }
}
