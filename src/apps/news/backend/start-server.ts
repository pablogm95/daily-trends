import 'reflect-metadata'
import { NewsBackendApp } from './NewsBackendApp'

try {
  new NewsBackendApp().startServer()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', error => {
  console.error('uncaughtException', error)
  process.exit(1)
})
