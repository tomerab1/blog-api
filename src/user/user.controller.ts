import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  public async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  public async getUser(@Param('id') id: string) {
    return this.usersService.getUser(parseInt(id, 10));
  }

  @Post()
  public async createUser(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.usersService.createUser(createUser);
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(parseInt(id, 10), updateData);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id, 10));
  }
}
