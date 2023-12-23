import express, { Application } from 'express'
import { StatusCodes } from 'http-status-codes'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './manage-error'

/*
 * Express configuration
 */
export class ExpressApi {
  private readonly app: Application

  constructor() {
    this.app = express()
    this.serverConfiguration()
    this.setupRoutes()
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.info(`SERVICE is listening on port ${port}`)
    })
  }

  private serverConfiguration() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(helmet())
    this.app.use(
      morgan('combined', {
        stream: {
          write: (text) => {
            console.info(text)
          },
        },
      })
    )
  }

  private setupRoutes() {
    const router = express.Router()

    // Ping route
    router.route('/ping').get((req, res) => {
      res.status(StatusCodes.OK).json({ status: 'Alive' })
    })

    this.app.use(router)

    // Middleware to manage errors
    this.app.use(errorHandler)
  }
}
