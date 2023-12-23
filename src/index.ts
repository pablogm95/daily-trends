import 'reflect-metadata'
import { install as installSourceMapSupport } from 'source-map-support'
import { ExpressApi } from './adapters/primary/rest/express'
import { Config } from './config'
import { MongoManager } from './adapters/secondary/mongodb'

async function main() {
  // Source mapping => compiled js
  installSourceMapSupport()

  // Mongo database connection
  const mongoManager = new MongoManager()
  // CONNECT DATABASE
  const mongoClient = await mongoManager.connect()

  if (!mongoClient) throw Error('Error in database connection')



  // HTTP adapter configuration
  const api = new ExpressApi()
  // Start api at port 8080 by default
  api.start(Config.HTTP_PORT)
}

main().catch((error) => {
  console.error(error)
  process.exit(0)
})

process.on('SIGTERM', () => {
  process.exit(0)
})
