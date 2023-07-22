import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from './dtos/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  public getUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('search')
  public search(@Query('q') searchQuery: string) {
    return this.usersService.searchUser(searchQuery);
  }

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateData);
  }

  @Delete('/:id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
