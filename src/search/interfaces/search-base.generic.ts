import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export default abstract class SearchBase<T> {
  // Index/databse.
  protected index: string;

  constructor(protected readonly elasticService: ElasticsearchService) {}

  setIndex(index: string) {
    this.index = index;
  }

  abstract indexEntity(entity: T);
  abstract query(search: string);
}
