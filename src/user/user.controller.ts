import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import { SerializeInterceptor } from './interceptors/serialize/serialize.interceptor';
import User from './entities/user.entity';

@UseInterceptors(new SerializeInterceptor(User))
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  public async getUsers() {
    return this.usersService.findAll();
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
