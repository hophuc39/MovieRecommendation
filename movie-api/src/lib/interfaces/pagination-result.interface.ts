/**
 * Pagination Result
 */
export class PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}
