import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsAdminController } from './products.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ApiClientModule } from '../../shared/api-client/api-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ApiClientModule],
  controllers: [ProductsAdminController],
  providers: [ProductsService],
})
export class ProductsModule {}
