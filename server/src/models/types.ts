export interface WithPagination<T> {
  result: T
  pagination: {
    limit: number
    current: number
    previous: number
    next: number,
    total: number,
    isLast: boolean
  }
}
