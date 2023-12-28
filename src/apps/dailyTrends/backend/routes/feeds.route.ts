import PromiseRouter from 'express-promise-router'
import type { Router } from 'express'
import Container from 'typedi'
import { FeedPostController } from '../controllers/FeedPostController'
import { FeedDeleteController } from '../controllers/FeedDeleteController'
import { FeedGetController } from '../controllers/FeedGetController'
import { FeedGetAllController } from '../controllers/FeedGetAllController'
import { FeedPatchController } from '../controllers/FeedPatchController'

export const generateRouter = (): Router => {
  const router = PromiseRouter()

  const feedPostController = Container.get(FeedPostController)
  const feedPatchController = Container.get(FeedPatchController)
  const feedGetController = Container.get(FeedGetController)
  const feedGetAllController = Container.get(FeedGetAllController)
  const feedDeleteController = Container.get(FeedDeleteController)

  router
    .route('/')
    .get(feedGetAllController.run)
    .post(feedPostController.run)

  router
    .route('/:id')
    .get(feedGetController.run)
    .patch(feedPatchController.run)
    .delete(feedDeleteController.run)

  return router
}
