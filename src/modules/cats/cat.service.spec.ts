import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CAT_MODEL } from './cat.schema';
import { CatsService } from './cats.service';
import { PaginateResult } from 'mongoose';
import { ICat, IQueryCat } from './cat.interface';
import { IPagination } from '../../common/pagination.dto';
import { ObjectId } from 'mongodb';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CatsService', () => {
  let catsService: CatsService;
  const catModel = {
    paginate: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: getModelToken(CAT_MODEL), useValue: catModel },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      const mockInputData: PaginateResult<ICat> = {
        docs: [],
        hasNextPage: false,
        hasPrevPage: false,
        limit: 10,
        offset: 0,
        pagingCounter: 0,
        totalDocs: 0,
        totalPages: 1,
        page: 1,
      };
      const mockOutputData: IPagination<IQueryCat> = {
        data: [],
        limit: 10,
        page: 1,
        total: 0,
      };
      catModel.paginate.mockResolvedValue(mockInputData);
      const result = await catsService.findAll();

      expect(result).toEqual(mockOutputData);
    });
  });

  describe('first', () => {
    const mockMongoId = new ObjectId().toString();
    it('should be throw cat not found.', async () => {
      const mockError = new HttpException(
        { key: 'cat.NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
      catModel.findById.mockImplementation(() => ({
        lean: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(catsService.findOne(mockMongoId)).rejects.toThrow(mockError);
    });
  });
});
