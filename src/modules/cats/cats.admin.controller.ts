import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonIdDto } from 'src/common/common-id.dto';
import { User } from '../users/user.decorator';
import { IUser } from '../users/user.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { QueryCatResponseDto } from './dto/query-cat-response.dto';

@ApiTags('cats')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('admin/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOkResponse({ type: () => QueryCatResponseDto })
  findAll(@User() user: IUser) {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @ApiHeader({
    name: 'lang',
  })
  @Get(':id')
  findOne(@Param() commonIdDto: CommonIdDto) {
    return this.catsService.findOne(commonIdDto.id);
  }
}
