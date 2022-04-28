import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IPagination } from '../../common/dto/pagination.dto';
import { IProduct } from './product.interface';
import { ApiClientService } from '../../shared/api-client/api-client.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly apiClientService: ApiClientService,
    @InjectPinoLogger(ProductsService.name) private logger: PinoLogger,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    this.logger.info(createProductDto);
    await this.productsRepository.save(createProductDto);
  }

  async findAll(
    getProductsDto: GetProductsDto,
  ): Promise<IPagination<IProduct>> {
    const { page, limit, search } = getProductsDto;
    const skip = (page - 1) * limit;
    const whereConditions: Record<string, unknown> = {};

    if (search) {
      whereConditions.name = Like(`%${search}%`);
    }
    const [products, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip,
      where: whereConditions,
    });

    return {
      data: products,
      total,
      page,
      limit,
    };
  }
}
