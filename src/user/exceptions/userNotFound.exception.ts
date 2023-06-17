import { NotFoundException } from '@nestjs/common';

export default class UserNotFound extends NotFoundException {
  constructor(id: number) {
    super(`User with id:${id} was not found`);
  }
}
