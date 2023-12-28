
import './dependency-injection'
import { Server } from './server'

export class NewsBackendApp {
  server?: Server

  async start() {
    const port = process.env.PORT || '8080'
    this.server = new Server(port)

    return this.server.listen()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  async stop() {
    return this.server?.stop()
  }
}
