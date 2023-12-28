import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { UpdateFeedById } from '@/Contexts/News/Feeds/application/updateFeedById'
import { FeedId } from '@/Contexts/News/Feeds/domain/FeedId'
import { FeedUpdateDTO } from '../dtos/feed-update.dto'

@Service()
export class FeedPatchController implements Controller {
  async run(req: Request<{ id: string}>, res: Response) {
    const { id } = req.params
    const feedUpdateDTO = new FeedUpdateDTO(req.body)

    await Container.get(UpdateFeedById).run(
      new FeedId(id),
      feedUpdateDTO.sanitize()
    )

    res.status(StatusCodes.NO_CONTENT).end()
  }
}
