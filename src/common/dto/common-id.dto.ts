import { IsMongoId } from 'class-validator';

export class CommonIdDto {
  @IsMongoId()
  id: string;
}
