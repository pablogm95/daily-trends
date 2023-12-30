
export interface ScraperEvaluator {
  evaluate<Elem extends HTMLElement, Selector extends string>(selector: Selector, handler: (elements: Elem[]) => void): Promise<void>;
  evaluateOne<Elem extends HTMLElement, Selector extends string>(selector: Selector, handler: (element: Elem) => void): Promise<void>;
}
