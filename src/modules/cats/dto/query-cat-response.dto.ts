import { PaginationResponseDto } from '../../../common/pagination.dto';
import { CatGender } from '../cat.constant';
import { IQueryCat } from '../cat.interface';

class QueryCatDto implements IQueryCat {
  _id: string;
  name: string;
  age: number;
  gender: CatGender;
}

export class QueryCatResponseDto extends PaginationResponseDto {
  data: QueryCatDto[];
}
