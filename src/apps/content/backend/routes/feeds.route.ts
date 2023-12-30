import PromiseRouter from 'express-promise-router'
import type { Router } from 'express'
import Container from 'typedi'
import { FeedPostController } from '../controllers/FeedPostController'

export const generateRouter = (): Router => {
  const router = PromiseRouter()

  const feedPostController = Container.get(FeedPostController)

  router
    .route('/:source')
    .post(feedPostController.run)

  return router
}
