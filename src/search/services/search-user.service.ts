import { Injectable } from '@nestjs/common';
import SearchServiceBase from './search-base.service';
import ISearchService from '../interfaces/search-service.interface';
import SearchBody from '../interfaces/search-body.interface';
import User from 'src/user/entities/user.entity';

@Injectable()
export default class SearchUserService implements ISearchService<User> {
  constructor(private readonly searchServce: SearchServiceBase) {}

  async indexEntity(entity: User) {
    throw new Error('Method not implemented.');
  }

  async updateIndex(id: string, newEntity: User) {
    throw new Error('Method not implemented.');
  }

  async searchDocument(query: string) {
    throw new Error('Method not implemented.');
  }

  async deleteDocument(id: string) {
    throw new Error('Method not implemented.');
  }
}
