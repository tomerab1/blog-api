import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  public async getUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('/:id')
  public async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  public async createUser(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.usersService.create(createUser);
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateData);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
