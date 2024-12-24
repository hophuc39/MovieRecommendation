/**
 * Pagination Result
 */
export class PaginationResult<T> {
  offset: number;
  limit: number;
  total: number;
  hasNext = false;
  items: T[];
}
