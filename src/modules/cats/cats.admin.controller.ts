import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonIdDto } from '../../common/dto/common-id.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Action } from '../permissions/permission.constant';
import { Permissions } from '../permissions/permission.decorator';
import { PermissionsGuard } from '../permissions/permission.guard';
import { User } from '../users/user.decorator';
import { IUser } from '../users/user.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { QueryCatResponseDto } from './dto/query-cat-response.dto';

@ApiTags('cats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/cats')
export class CatsAdminController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @Permissions([Action.CAT_FEATURE_READ])
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
