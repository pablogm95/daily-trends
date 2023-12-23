import 'reflect-metadata'
import { install as installSourceMapSupport } from 'source-map-support'
import { ExpressApi } from './adapters/primary/rest/express'
import { Config } from './config'

async function main() {
  // Source mapping => compiled js
  installSourceMapSupport()


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
