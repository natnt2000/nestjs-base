import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CAT_MODEL } from './cat.schema';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { ICatDoc, IQueryCat } from './cat.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { formatPaginationData, IPagination } from '../../common/pagination.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(CAT_MODEL) private readonly model: PaginateModel<ICatDoc>,
  ) {}

  async findAll(): Promise<IPagination<IQueryCat>> {
    const query = {};
    const options: PaginateOptions = {
      lean: true,
      select: 'age name gender',
    };
    const data = await this.model.paginate(query, options);

    return formatPaginationData(data);
  }

  async create(createCatDto: CreateCatDto) {
    return this.model.create(createCatDto);
  }

  async findOne(id: string) {
    const cat = await this.model.findById(id).lean();

    if (!cat) {
      throw new HttpException({ key: 'cat.NOT_FOUND' }, HttpStatus.NOT_FOUND);
    }

    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return this.model.updateOne({ _id: id }, updateCatDto);
  }
}
