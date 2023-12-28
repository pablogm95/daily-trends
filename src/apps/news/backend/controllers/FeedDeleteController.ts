import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { DeleteFeedById } from '@/Contexts/News/Feeds/application/deleteFeedById'
import { FeedId } from '@/Contexts/News/Feeds/domain/FeedId'

@Service()
export class FeedDeleteController implements Controller {
  async run(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    await Container.get(DeleteFeedById).run(new FeedId(id))

    res.status(StatusCodes.NO_CONTENT).end()
  }
}
