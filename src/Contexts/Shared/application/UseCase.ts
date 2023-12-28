export interface UseCase {
  run(...params: unknown[]): unknown
}
