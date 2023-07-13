import Post from 'src/post/entities/post.entity';
import SearchBase from '../interfaces/search-base.generic';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { POST_INDEX } from '../constants';

@Injectable()
export default class SearchPost extends SearchBase<Post> {
  constructor(private readonly elasticSerivce: ElasticsearchService) {
    super(elasticSerivce);
    this.setIndex(POST_INDEX);
  }

  indexEntity(entity: Post) {
    this.elasticService.index({
      index: this.index,
      body: {
        id: entity.id,
      },
    });
  }

  query(search: string) {
    throw new Error('Method not implemented.');
  }
}
