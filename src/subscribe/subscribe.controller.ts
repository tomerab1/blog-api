import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Request } from 'express';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createSubscribeDto: CreateSubscribeDto,
  ) {
    return this.subscribeService.create(request, createSubscribeDto);
  }

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.subscribeService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.subscribeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSubscribeDto: UpdateSubscribeDto,
  ) {
    return this.subscribeService.update(id, updateSubscribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subscribeService.remove(id);
  }
}
