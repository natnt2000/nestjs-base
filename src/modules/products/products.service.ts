import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IPagination } from '../../common/pagination.dto';
import { IProduct } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<IPagination<IProduct>> {
    const page = 1;
    const limit = 10;
    const [products, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip: (page - 1 > 0 ? page - 1 : 0) * limit,
    });

    return {
      data: products,
      total,
      page,
      limit,
    };
  }
}
