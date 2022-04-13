import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema, CAT_MODEL } from './cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CAT_MODEL, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
