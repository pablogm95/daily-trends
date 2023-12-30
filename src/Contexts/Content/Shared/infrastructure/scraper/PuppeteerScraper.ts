import { Scraper } from '@/Contexts/Shared/domain/Scraper'
import { Pool, createPool } from 'generic-pool'
import puppeteer, { Browser } from 'puppeteer'

export class PuppeteerScraper implements Scraper {
  private browserPool: Pool<Browser>

  constructor() {
    this.browserPool = createPool(
      {
        create: () => {
          return puppeteer.launch({
            args: ['--no-sandbox'],
            headless: 'new',
          })
        },
        destroy: async (browser) => {
          await browser.close()
        },
      },
      {
        max: 10,
        min: 0,
        evictionRunIntervalMillis: 10000,
      }
    )
  }

  async scrap<R extends Record<string, string>>(
    url: URL,
    querySelectors: Map<keyof R, string>
  ): Promise<R[]> {
    const browser = await this.browserPool.acquire()

    const page = await browser.newPage()

    await page.goto(url.toString(), { waitUntil: 'load' })

    const items: R[] = []
    for (const [key, value] of querySelectors) {
      await page.waitForSelector(value)

      const results = await page.$$eval(value, (elements) =>
        (elements as unknown as HTMLElement[]).map(
          (element) => element.innerText
        )
      )

      results.forEach((result, index) => {
        if (!items[index]) {
          items[index] = {} as R
        }
        items[index][key] = result as R[keyof R]
      })
    }

    this.browserPool.release(browser)

    return items
  }
}
