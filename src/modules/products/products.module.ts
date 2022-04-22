import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsAdminController } from './products.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsAdminController],
  providers: [ProductsService],
})
export class ProductsModule {}
