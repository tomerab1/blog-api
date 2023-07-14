import Post from 'src/post/entities/post.entity';
import SearchServiceBase from '../interfaces/search-base.generic';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { FILEDS_TO_MATCH_POST, POST_INDEX } from '../constants';

@Injectable()
export default class SearchServicePost extends SearchServiceBase<Post> {
  constructor(private readonly elasticService: ElasticsearchService) {
    super();
    this.setIndex(POST_INDEX);
  }

  async createIndex(entity: Post) {
    try {
      return this.elasticService.index({
        index: this.index,
        refresh: true,
        body: {
          id: entity.id,
          title: entity.title,
          content: entity.content,
          userId: entity.user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateIndex(id: string, newEntity: Post) {
    try {
      return await this.elasticService.update({
        index: this.index,
        refresh: true,
        id: id,
        body: {
          id: newEntity.id,
          title: newEntity.title,
          content: newEntity.content,
          userId: newEntity.user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(id: string) {
    try {
      return this.elasticService.delete({
        index: this.index,
        id: id,
      });
    } catch (error) {
      throw error;
    }
  }

  async searchDocument(text: string) {
    try {
      return await this.elasticService.search({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: FILEDS_TO_MATCH_POST,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
