import { HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CatGender } from './cat.constant';
import { CreateCatDto } from './dto/create-cat.dto';

const findAllMocks = {
  mockInputData: {
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    offset: 0,
    pagingCounter: 0,
    totalDocs: 0,
    totalPages: 1,
    page: 1,
  },

  mockOutputData: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
  },

  mockError: new HttpException({ key: 'cat.NOT_FOUND' }, HttpStatus.NOT_FOUND),
};

const mockMongoId = new ObjectId().toString();

const createMocks = {
  createCatDto: <CreateCatDto>{
    age: 10,
    name: 'Black Cat',
    gender: CatGender.MALE,
  },
};

export { findAllMocks, mockMongoId, createMocks };
