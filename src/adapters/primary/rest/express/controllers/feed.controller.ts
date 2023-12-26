import Container from 'typedi'
import { CreateFeed } from '../../../../../use-cases/feeds/createFeed'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { FeedCreationDTO } from '../../../../DTOs/feed-creation.dto'
import asyncHandler from 'express-async-handler'

export class FeedController {
  private readonly createFeedUseCase = Container.get(CreateFeed)

  createFeed = asyncHandler(async (req: Request, res: Response) => {
    const feedCreationDTO = new FeedCreationDTO(req.body)

    const response = await Container.get(CreateFeed).execute(
      feedCreationDTO.sanitize()
    )

    res.status(StatusCodes.CREATED).json(response)
  })
}
