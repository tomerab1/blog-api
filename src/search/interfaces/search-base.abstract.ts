import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Search from './search.interface';

@Injectable()
export default abstract class SearchBase<T extends Search> {
  // Index/databse.
  private index: string;

  constructor(private readonly elasticService: ElasticsearchService) {}

  setIndex(index: string) {
    this.index = index;
  }

  abstract query(search: T);
}
