import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CAT_MODEL } from './cat.schema';
import { CatsService } from './cats.service';
import { getLoggerToken } from 'nestjs-pino';
import { createMocks, findAllMocks, mockMongoId } from './cat.mock';

describe('CatsService', () => {
  let catsService: CatsService;
  const catModel = {
    paginate: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };
  const mockLogger = {
    info: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: getModelToken(CAT_MODEL), useValue: catModel },
        { provide: getLoggerToken(CatsService.name), useValue: mockLogger },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      const { mockInputData, mockOutputData } = findAllMocks;
      catModel.paginate.mockResolvedValue(mockInputData);
      const result = await catsService.findAll();

      expect(result).toEqual(mockOutputData);
    });

    it('should be throw cat not found.', async () => {
      const { mockError } = findAllMocks;
      catModel.findById.mockImplementation(() => ({
        lean: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(catsService.findOne(mockMongoId)).rejects.toThrow(mockError);
    });
  });

  describe('create', () => {
    it('should be successful', async () => {
      const { createCatDto } = createMocks;
      const mockCreateFunction = jest.spyOn(catsService, 'create');

      await catsService.create(createCatDto);
      expect(mockCreateFunction).toBeCalledWith(createCatDto);
    });
  });
});
