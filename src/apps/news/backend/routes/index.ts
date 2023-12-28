import type { Router } from 'express'
import * as statusRoute from './status.route'
import * as feedRoute from './feeds.route'

export function registerRoutes(router: Router) {
  router.use('/status', statusRoute.generateRouter())
  router.use('/feeds', feedRoute.generateRouter())
}
