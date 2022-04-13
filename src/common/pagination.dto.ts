import { PaginateResult } from 'mongoose';

export interface IPagination<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export const formatPaginationData = <T>(
  paginateResult: PaginateResult<T>,
): IPagination<T> => {
  return {
    total: paginateResult.totalDocs,
    page: paginateResult.page,
    limit: paginateResult.limit,
    data: paginateResult.docs,
  };
};

export class PaginationResponseDto {
  total: number;
  page: number;
  limit: number;
}
