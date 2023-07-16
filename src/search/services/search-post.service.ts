import Post from 'src/post/entities/post.entity';
import SearchServiceBase from './search-base.service';
import { Injectable } from '@nestjs/common';
import { FILEDS_TO_MATCH_POST, POST_INDEX } from '../constants';
import SearchQuery from '../interfaces/search-query.interface';

@Injectable()
export default class SearchServicePost {
  constructor(private readonly searchService: SearchServiceBase) {
    searchService.setIndex(POST_INDEX);
  }

  private createSearchBody(entity: Post) {
    return {
      body: {
        id: entity.id,
        title: entity.title,
        content: entity.content,
        userId: entity.user.id,
      },
    };
  }

  async createIndex(entity: Post) {
    return await this.searchService.createIndex(this.createSearchBody(entity));
  }

  async updateIndex(id: string, newEntity: Post) {
    return await this.searchService.updateIndex(
      id,
      this.createSearchBody(newEntity),
    );
  }

  async deleteDocument(id: string) {
    return await this.deleteDocument(id);
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
