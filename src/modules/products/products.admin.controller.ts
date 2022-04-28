import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Action } from '../permissions/permission.constant';
import { Permissions } from '../permissions/permission.decorator';
import { PermissionsGuard } from '../permissions/permission.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Permissions([Action.PRODUCT_FEATURE_CREATE])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Permissions([Action.PRODUCT_FEATURE_READ])
  @Get()
  findAll(@Query() getProductsDto: GetProductsDto) {
    return this.productsService.findAll(getProductsDto);
  }
}
