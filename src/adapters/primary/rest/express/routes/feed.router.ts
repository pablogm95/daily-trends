import { Router } from 'express'
import { FeedController } from '../controllers/feed.controller'

export const createFeedRouter = (): Router => {
  const router = Router()
  const feedController = new FeedController()

  router.route('/').post(feedController.createFeed)

  return router
}
