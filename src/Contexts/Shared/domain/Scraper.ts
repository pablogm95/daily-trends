
export interface Scraper {
  visit(url: URL): Promise<Document>;
}
