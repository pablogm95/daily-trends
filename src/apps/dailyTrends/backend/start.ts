import 'reflect-metadata'
import { DailyTrendsBackendApp } from './DailyTrendsBackendApp'

try {
  new DailyTrendsBackendApp().start()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', error => {
  console.error('uncaughtException', error)
  process.exit(1)
})
