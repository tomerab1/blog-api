import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Search from './search.interface';

@Injectable()
export default abstract class SearchBase<T extends Search> {
  constructor(private readonly elasticService: ElasticsearchService) {}

  async query(search: T) {
    return null;
  }
}
