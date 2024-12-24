import { FilterQuery, Model } from 'mongoose';
import { PaginationResult } from '../interfaces/pagination-result.interface';

export const paginate = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  limit = 100,
  offset = 0
): Promise<PaginationResult<T>> => {
  const [items, count] = await Promise.all([
    model.find(filter).skip(offset).limit(limit).exec(),
    model.countDocuments(filter).exec(),
  ]);
  return generatePaginationResult(items, count, offset, limit);
};

/**
 * Generate empty page result
 */
export const generateEmptyPage = <T>(offset: number): PaginationResult<T> => {
  return generatePaginationResult([], 0, offset, offset);
};

/**
 * Generate pagination result
 */
export const generatePaginationResult = <T>(
  items: T[],
  total: number,
  offset: number,
  limit: number
): PaginationResult<T> => {
  const result = new PaginationResult<T>();

  result.offset = offset;
  result.limit = limit;
  result.total = total;
  result.hasNext = result.offset + result.limit < result.total;
  result.items = items;

  return result;
};

const PaginationHelpers = {
  paginate,
  generatePaginationResult,
  generateEmptyPage,
};

export default PaginationHelpers;
