import Post from 'src/post/entities/post.entity';
import SearchServiceBase from './search-base.service';
import { Injectable } from '@nestjs/common';
import { FILEDS_TO_MATCH_POST, POST_INDEX } from '../constants';
import ISearchService from '../interfaces/search-service.interface';
import SearchQuery from '../interfaces/search-query.interface';

interface SearchPostEntity {
  usrId: number;
  postId: number;
  title: string;
  content: string;
}

@Injectable()
export default class SearchPostService implements ISearchService<Post> {
  constructor(
    private readonly searchService: SearchServiceBase<SearchPostEntity>,
  ) {
    searchService.setIndex(POST_INDEX);
  }

  async indexEntity(id: string, entity: Post) {
    return await this.searchService.indexEntity(id, {
      usrId: entity.user.id,
      postId: entity.id,
      title: entity.title,
      content: entity.content,
    });
  }

  async updateEntity(newEntity: Post) {
    return await this.searchService.updateEntity(newEntity.id.toString(), {
      usrId: newEntity.user.id,
      postId: newEntity.id,
      title: newEntity.title,
      content: newEntity.content,
    });
  }

  async deleteDocument(id: string) {
    return await this.searchService.deleteDocument(id);
  }

  async searchDocument(text: string) {
    const searchQuery: SearchQuery = {
      body: {
        query: {
          multi_match: {
            query: text,
            fields: FILEDS_TO_MATCH_POST,
          },
        },
      },
    };

    return await this.searchService.searchDocument(searchQuery);
  }
}
