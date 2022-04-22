import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let productsService: ProductsService;
  const mockRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: mockRepository },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should be successful', async () => {
      const mockCreateFunction = jest.spyOn(productsService, 'create');
      const mockInput: CreateProductDto = {
        name: 'Product Test',
        price: 1,
      };
      await productsService.create(mockInput);
      expect(mockCreateFunction).toBeCalledWith(mockInput);
    });
  });
});
