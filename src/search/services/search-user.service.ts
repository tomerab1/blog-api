import { Injectable } from '@nestjs/common';
import SearchServiceBase from './search-base.service';
import ISearchService from '../interfaces/search-service.interface';
import User from 'src/user/entities/user.entity';

interface ISearchUserEntity {
  usrId: number;
  firstName: string;
  lastName: string;
}

@Injectable()
export default class SearchUserService implements ISearchService<User> {
  constructor(
    private readonly searchServce: SearchServiceBase<ISearchUserEntity>,
  ) {}

  async indexEntity(id: string, entity: User) {
    throw new Error('Method not implemented.');
  }

  async updateEntity(newEntity: User) {
    throw new Error('Method not implemented.');
  }

  async searchDocument(query: string) {
    throw new Error('Method not implemented.');
  }

  async deleteDocument(id: string) {
    throw new Error('Method not implemented.');
  }
}
