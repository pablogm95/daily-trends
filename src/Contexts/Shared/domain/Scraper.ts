
export interface Scraper {
  scrap<R extends Record<string, string>>(url: URL, querySelectors: Map<keyof R, string>): Promise<R[]>;
}
