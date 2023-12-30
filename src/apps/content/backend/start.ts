import 'reflect-metadata'
import { ContentBackendApp } from './ContentBackendApp'

try {
  new ContentBackendApp().start()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', error => {
  console.error('uncaughtException', error)
  process.exit(1)
})
