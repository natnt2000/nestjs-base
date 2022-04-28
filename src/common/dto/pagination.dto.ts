import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaginateResult } from 'mongoose';
import { trimSpecialCharactersWhenSearch } from '../utility';

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

export class CommonPaginationResponseDto {
  total: number;
  page: number;
  limit: number;
}

export class CommonPaginationDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  limit: number;

  @IsOptional()
  @IsString()
  // @Transform((params) => trimSpecialCharactersWhenSearch(params?.value))
  search?: string;
}
