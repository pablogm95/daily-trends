import { ScraperEvaluator } from './ScraperEvaluator'

export interface ScraperParser {
  evaluate(evaluators: ScraperEvaluator[]): Promise<Document>;
}
