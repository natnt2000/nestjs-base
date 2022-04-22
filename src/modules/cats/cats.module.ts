import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsAdminController } from './cats.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema, CAT_MODEL } from './cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CAT_MODEL, schema: CatSchema }]),
  ],
  controllers: [CatsAdminController],
  providers: [CatsService],
})
export class CatsModule {}
